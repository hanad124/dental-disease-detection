"use client";

import React, { useState } from "react";
import { FiRadio, FiLoader } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../style/Tabs.css";
import { IconLink, IconFile,IconInfoCircle } from "@tabler/icons-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Result from "./Result";
import { useImage } from "@/store/image";

// Define the schema for URL and file separately
const urlSchema = z.object({
  url: z.string().url(),
});

const fileSchema = z.object({
  file: z.instanceof(File),
});

const Fields = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const image = useImage((state) => state.image);
  const loading = useImage((state) => state.loading);
  const notImageUrl = useImage((state) => state.notImageUrl);
  const fetchImage = useImage((state) => state.fetchImage);
  const fetchImageFile = useImage((state) => state.fetchImageFile);
  const chartData = useImage((state) => state.chartData);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<any | null>(null);

  const form = useForm({
    resolver: zodResolver(activeTab === 0 ? urlSchema : fileSchema),
    defaultValues: {
      url: "",
      file: null,
    },
  });

  const onSubmit = async (data: any) => {
    if (activeTab === 0) {
      fetchImage(data.url);
    } else if (activeTab === 1) {
      await fetchImageFile(data.file);
    }

    if (notImageUrl) {
      toast({
        title: "Invalid Image URL",
        description: "Please enter a valid image URL",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : (null as any);
    setFile(selectedFile);
    form.setValue("file", selectedFile);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    form.reset({ url: "", file: null });
  };

  return (
    <div>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabList
          className={
            "border border-dashed flex justify-center items-center py-2 px-5 rounded-lg mx-auto w-fit"
          }
        >
          <Tab>
            <IconLink className="rotate-90" size={19} />
            <span className="ml-2">URL</span>
          </Tab>
          <Tab>
            <IconFile size={17} />
            <span className="ml-2">File Upload</span>
          </Tab>
        </TabList>
        <div className="flex justify-center items-center mt-2">
          <IconInfoCircle size={17} className="text-gray-500" />
          <span className="ml-2 text-[13px] text-gray-400 font-light">
            choose the method to upload your dental X-ray
          </span>
        </div>

        <TabPanel>
          <Form {...form}>
            <div className="flex justify-center  mx-auto w-full mt-10">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex  gap-3  relative"
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Paste image URL here"
                          className="items-center bg-white border border-gray-200 text-sm text-gray-800 h-12 flex justify-center text-clip px-3 py-3 w-full md:w-[36rem] transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 rounded-md"
                          onChange={(e) => {
                            e.preventDefault();
                            setUrl(e.target.value);
                            setFile(null);
                            field.onChange(e);
                          }}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full md:ml-2 md:w-auto flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-none focus:ring-none py-[23px] px-4 dark:focus:ring-offset-none 
                          ${
                            loading
                              ? "cursor-not-allowed bg-gradient-to-tlfrom-blue-600/30 to-violet-600/30"
                              : ""
                          }`}
                >
                  {loading ? (
                    <>
                      <div className="flex items-center gap-x-2">
                        <span>Submitting</span>
                        <FiLoader className="animate-spin w-4 h-4" />{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <FiRadio className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </Form>
        </TabPanel>

        <TabPanel>
          <Form {...form}>
            <div className="flex justify-center items-center mx-auto w-full mt-10">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-3 relative"
              >
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            handleFileChange(e);
                            field.onChange(
                              e.target.files ? e.target.files[0] : null
                            );
                          }}
                          className="items-center bg-white border border-gray-200 text-sm text-gray-800 h-12 flex justify-center cursor-pointer text-clip px-3 py-3 w-full md:w-[36rem] transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 rounded-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full md:ml-2 md:w-auto inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-none focus:ring-none py-3 px-4 dark:focus:ring-offset-none 
                          ${
                            loading
                              ? "cursor-not-allowed bg-gradient-to-tlfrom-blue-600/30 to-violet-600/30"
                              : ""
                          }`}
                >
                  {loading ? (
                    <>
                      <div className="flex items-center gap-x-2">
                        <span>Submitting</span>
                        <FiLoader className="animate-spin w-4 h-4" />{" "}
                      </div>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <FiRadio className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </Form>
        </TabPanel>
      </Tabs>

      <Result
        image={image}
        loader={loading}
        invalidLink={notImageUrl}
        chartData={
          chartData || {
            classes: [],
            confidences: [],
          }
        }
      />
    </div>
  );
};

export default Fields;
