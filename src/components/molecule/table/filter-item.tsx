"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterConfig } from "@/constants/types/table";

interface FilterItemProps {
  config: FilterConfig;
  value: string | string[] | number | Date | [Date, Date] | undefined;
  onChange: (value: string | string[] | number | Date | [Date, Date]) => void;
  onRemove: () => void;
}

const removeButtonVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export function FilterItem({
  config,
  value,
  onChange,
  onRemove,
}: FilterItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasValue = () => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== "" && value !== null && value !== undefined;
  };

  const renderFilterContent = () => {
    switch (config.type) {
      case "text":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              type="text"
              placeholder={
                config.placeholder || `Input ${config.label.toLowerCase()}...`
              }
              value={(value as string) || ""}
              onChange={(e) => onChange(e.target.value)}
              className="h-9"
            />
          </motion.div>
        );

      case "number":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Input
              type="number"
              placeholder={
                config.placeholder || `Input ${config.label.toLowerCase()}...`
              }
              value={(value as number) || ""}
              onChange={(e) => onChange(Number(e.target.value))}
              className="h-9"
            />
          </motion.div>
        );

      case "select":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Select value={(value as string) || ""} onValueChange={onChange}>
              <SelectTrigger className="h-9">
                <SelectValue
                  placeholder={
                    config.placeholder ||
                    `Chọn ${config.label.toLowerCase()}...`
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {config.options?.map((option) => (
                  <SelectItem key={option.value} value={String(option.value)}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        );

      case "multiselect":
        const selectedValues = (value as string[]) || [];
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent h-9 font-normal w-full"
                  >
                    {selectedValues.length > 0
                      ? `${selectedValues.length} items selected`
                      : config.placeholder ||
                        `Select ${config.label.toLowerCase()}...`}
                  </Button>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent className="w-64" side="bottom" align="start">
                <motion.div
                  className="space-y-2 max-h-48 overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {config.options?.map((option, index) => (
                    <motion.div
                      key={option.value}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Checkbox
                        id={`${config.key}-${option.value}`}
                        checked={selectedValues.includes(String(option.value))}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onChange([...selectedValues, String(option.value)]);
                          } else {
                            onChange(
                              selectedValues.filter(
                                (v) => v !== String(option.value)
                              )
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor={`${config.key}-${option.value}`}
                        className="text-sm"
                      >
                        {option.label}
                      </Label>
                    </motion.div>
                  ))}
                </motion.div>
              </PopoverContent>
            </Popover>
          </motion.div>
        );

      case "date":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Popover>
              <PopoverTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent h-9 font-normal w-full"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {value
                      ? (value as Date).toLocaleDateString("vi-VN")
                      : config.placeholder ||
                        `Chọn ${config.label.toLowerCase()}...`}
                  </Button>
                </motion.div>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0"
                side="bottom"
                align="start"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar
                    mode="single"
                    selected={value as Date}
                    onSelect={(date) => date && onChange(date)}
                    initialFocus
                  />
                </motion.div>
              </PopoverContent>
            </Popover>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="py-0.5"
        >
          <Label className="text-sm font-medium">{config.label}</Label>
        </motion.div>
        <AnimatePresence>
          {hasValue() && (
            <motion.div
              variants={removeButtonVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Button
                variant="ghost"
                size="sm"
                className="size-6 p-0"
                onClick={onRemove}
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-3 w-3" />
                </motion.div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {renderFilterContent()}
    </motion.div>
  );
}
