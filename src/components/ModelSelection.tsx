"use client";

// import Select from "react-select";
import useSWR from "swr";
import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp } from "@phosphor-icons/react";

const fetchModels = () =>
  fetch("/api/getModels").then((response) => response.json());

export default function ModelSelection() {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo",
  });

  return (
    <Select.Root
      value={model}
      onValueChange={(e) => setModel(e)}
      defaultValue={model}
    >
      <Select.Trigger
        id="game"
        name="game"
        className="inline-flex mt-2 items-center justify-between bg-openai-600 w-full py-3 px-4 rounded text-sm
   placeholder:text-zinc-500 text-white space-x-2"
      >
        <Select.Value placeholder={model} />
        <Select.Icon>
          <CaretDown size={18} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal className="text-white">
        <Select.Content className="overflow-hidden bg-openai-600 rounded text-white min-h-[40rem] h-[40rem] translate-y-[6.2rem] -translate-x-1">
          <Select.ScrollUpButton className="flex justify-center items-center h-6 bg-openai-800">
            <CaretUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1 text-white">
            <Select.Group className="">            
              {models &&
              models.modelsOptions.map((model: ModelOptions) => (
                <Select.Item
                  value={model.value}
                  key={model.value}
                  className="flex items-center h-8 px-[13px] cursor-pointer hover:bg-gray-700/80 hover:border-none hover:outline-none focus:bg-gray-700/80 focus:border-none focus:outline-none"
                >
                  <Select.ItemText>{model.label}</Select.ItemText>
                </Select.Item>
              ))}
              </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex justify-center items-center h-6 bg-openai-800">
            <CaretDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
