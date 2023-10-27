import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, useRef, useState } from "react";

type Props = (MultipleFiles | SingleFile) &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Specifications on `accept` values
     * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers
     */
    accept?: string;
    /**
     * maximum size of each file in Kb
     *
     * @default 20Mb (20 * 1024)
     */
    size?: number;
  };

const DEFAULT_KB = 20 * 1024;

export const FormFile = forwardRef<HTMLDivElement, Props>(function FormFile(
  { multiple, accept, size = DEFAULT_KB, onUpload, className, ...props },
  ref,
) {
  // translated to bytes or default 20mb
  const inputRef = useRef<HTMLInputElement>(null);
  // for debugging purpose only for now
  const [fileList, setFileList] = useState<File[]>([]);
  const { toast } = useToast();

  function handleFileUpload(files: File[]) {
    // check for size
    const parseResult = parseFileSize(files, size);
    if (parseResult.success) {
      setFileList(files);

      // NOTE: actual callback to parent component
      if (!!onUpload) {
        if (multiple) onUpload(files);
        else if (!!files[0]) {
          onUpload(files[0]);
        }
      }
    } else {
      const { badFiles } = parseResult;
      toast({
        variant: "destructive",
        title: "Trying to upload files exceeding the size limit!",
        description: `You are trying to upload these files that exceed the limit of
        ${size} Kb: ${badFiles.join(", ")}`,
      });
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-[6rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed",
        className,
      )}
      onClick={() => inputRef.current?.click()}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.items) {
          const nextList = [...e.dataTransfer.items]
            .filter((e) => e.kind === "file" && !!e.getAsFile()) // safe typecast
            .map((e) => e.getAsFile()) as File[];

          handleFileUpload(nextList);
        } else {
          const nextList = [...e.dataTransfer.files];
          handleFileUpload(nextList);
        }
      }}
      {...props}
      ref={ref}
    >
      {!!fileList.length ? (
        <div className="flex flex-col gap-2 text-muted-foreground">
          <span className="text-center">{fileList.length} files selected</span>
          <div className="flex flex-wrap ">
            {fileList.map((file, index) => (
              <span key={index} className="text-muted-foreground">
                {file.name}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground">
          Drop files / click to upload
        </span>
      )}
      <input
        type="file"
        accept={accept}
        className="hidden"
        multiple={multiple}
        onChange={(e) => {
          if (!!e.target.files) {
            const nextList = [...e.target.files];
            handleFileUpload(nextList);
          }
        }}
        ref={inputRef}
      />
    </div>
  );
});

function parseFileSize(
  files: File[],
  sizeLimitInKb: number,
): { success: true } | { success: false; badFiles: string[] } {
  const badFiles = files
    .filter((file) => file.size > sizeLimitInKb * 1024)
    .map((e) => e.name);

  if (badFiles.length > 0) return { success: false, badFiles };

  return { success: true };
}

type MultipleFiles = { multiple: true; onUpload?: (files: File[]) => void };
type SingleFile = { multiple?: false; onUpload?: (files: File) => void };
