import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCommon = ({
  options,
  setTasksDetails,
  defaultPlaceHolder,
  tasksDetails,
}) => {
  const handleChange = (value) => {
    setTasksDetails((prev) => ({
      ...prev,
      taskSeverity: value,
    }));
  };

  return (
    <div>
      <Select
        onValueChange={handleChange}
        defaultValue={tasksDetails?.taskSeverity}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={defaultPlaceHolder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCommon;
