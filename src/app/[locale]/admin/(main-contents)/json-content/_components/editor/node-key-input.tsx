import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";
import { JsonNodeData } from "@/types";
import { AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator";


type Props = {
  data: JsonNodeData;
  handleKeyChange: (value: string) => void;
  localKey: string;
  isDuplicate?: boolean;
}

export const KeyInputFiled = ({ data, handleKeyChange, localKey, isDuplicate }: Props) => (
  <>
    <div className="relative">
      <Input
        className={cn(
          "w-44 border-none rounded-none bg-transparent font-semibold",
          !(data.valueType === "array" || data.valueType === "object") && "rounded-tr-none rounded-bl-none rounded-br-none"
        )}
        value={localKey}
        onChange={(e) => handleKeyChange(e.target.value)}
      />
      {isDuplicate && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant={'custom'} className="absolute right-1 top-1/2 -translate-y-1/2 text-destructive z-20 cursor-pointer">
                <AlertCircle size={20} />
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="bg-destructive text-destructive-foreground">
              <p>Duplicated key</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
    <Separator orientation="vertical" className="h-[calc(100%+0.5rem)] bg-background" />
  </>
)