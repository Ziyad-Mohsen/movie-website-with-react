import React from "react";
import { BiError } from "react-icons/bi";
import Button from "../ui/Button/Button";

interface ErrorProps {
  message?: string;
  statusCode?: number;
  retry?: () => void;
}

const Error: React.FC<ErrorProps> = ({
  message = "Something went wrong.",
  statusCode,
  retry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full p-6 rounded-lg border bg-primary-shade-4 border-primary-shade-3">
      <BiError size={48} />
      <h2 className="text-lg font-semibold mb-1">
        Error{statusCode ? ` (${statusCode})` : null}
      </h2>
      <p className="mb-3 text-center">{message}</p>
      {retry && (
        <Button
          variant="fill"
          color="primary"
          size="sm"
          onClick={retry}
          className="cursor-pointer transition rounded-sm bg-primary-shade-3"
        >
          Retry
        </Button>
      )}
    </div>
  );
};

export default Error;
