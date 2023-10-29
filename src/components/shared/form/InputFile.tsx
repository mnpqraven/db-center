import {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = HTMLAttributes<HTMLDivElement> & {
  value: FileList | undefined;
  onChange: (e: FileList) => void;
};

const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image),
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
};

export const InputFile = forwardRef<HTMLDivElement, Props>(function InputFile({
  className,
  value,
  onChange,
  ...props
}) {
  const [preview, setPreview] = useState<string | undefined>();
  useEffect(() => {
    if (typeof value == "string") setPreview(value);
  }, [value]);
  return (
    <>
      <Input
        type="file"
        accept="image/*"
        className={className}
        {...props}
        onChange={(event) => {
          const { files, displayUrl } = getImageData(event);
          setPreview(displayUrl);
          onChange(files);
        }}
      />
      {preview && (
        <Avatar className="h-32 w-32 rounded-none mt-2">
          <AvatarImage src={preview} />
        </Avatar>
      )}
    </>
  );
});
