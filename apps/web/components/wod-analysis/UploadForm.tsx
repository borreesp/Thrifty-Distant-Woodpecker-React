"use client";
import React from "react";
import { WodImageUploader } from "../wod/WodImageUploader";
import type { EditableWodBlock } from "../wod/wod-types";

type Props = {
  onParsed: (payload: { imageUrl: string; blocks: EditableWodBlock[] }) => void;
  onProcessingChange?: (loading: boolean) => void;
};

export const UploadForm: React.FC<Props> = ({ onParsed, onProcessingChange }) => {
  return (
    <div className="space-y-4">
      <WodImageUploader onParsed={onParsed} onProcessingChange={onProcessingChange} />
    </div>
  );
};
