import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectCommon = ({
  options,
  setTasksDetails,
  defaultPlaceHolder,
  tasksDetails,
  selectLabel,
}) => {
  const handleChange = (value) => {
    setTasksDetails((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  return (
    <div>
      <Select
        onValueChange={handleChange}
        defaultValue={tasksDetails?.taskSeverity}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={defaultPlaceHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup label={selectLabel}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCommon;
