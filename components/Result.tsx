import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiAlertTriangle } from "react-icons/fi";
import { useImage } from "@/store/image";
import { IconInfoCircle, IconDownload } from "@tabler/icons-react";


interface ResultProps {
  image: any;
  chartData: {
    classes: string[];
    confidences: number[];
  };
  loader: boolean;
  invalidLink: boolean;
}

import coverPhoto from "@/public/assets/cover.jpeg";

const Result: React.FC<ResultProps> = ({
  image,
  loader,
  invalidLink,
  chartData,
}) => {
  const explanations = useImage((state) => state.explanations);
  const fetchExplanation = useImage((state) => state.fetchExplanation);

  useEffect(() => {
    chartData.classes.forEach((disease) => {
      if (!explanations[disease]) {
        fetchExplanation(disease);
      }
    });
  }, [chartData.classes, explanations, fetchExplanation]);

  const noImageData = !image || Object.keys(image).length === 0;

  const formatExplanation = (text: string) => {
    const lines = text.split("\n");
    const elements = lines.map((line, index) => {
      if (line.startsWith("Title:")) {
        return (
          <h2 key={index} className="text-lg font-semibold mt-4">
            {line.replace("Title:", "").trim()}
          </h2>
        );
      }
      if (line.startsWith("List:")) {
        const items = line.replace("List:", "").trim().split(", ");
        return (
          <ul key={index} className="list-disc list-inside">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="mt-2">
          {line}
        </p>
      );
    });
    return elements;
  };

  return (
    <>
      <div className="px-4 md:px-0 w-full flex justify-center my-10">
        {noImageData ? null : (
          <Card className="w-full md:w-[43rem]">
            <CardHeader>
              <div className="relative">
                <Image
                  src={image || coverPhoto}
                  height={300}
                  width={400}
                  alt={"inference result"}
                  className="max-h-[480px] w-full rounded-xl"
                />
                {image && chartData.classes.length > 0 && (
                  <a
                    href={image}
                    download="dental_xray_analysis.jpg"
                    className="absolute bottom-2 right-2 bg-white bg-blue-500 text-white hover:bg-blue-600 hover:text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center gap-2"
                  >
                    <IconDownload className="text-white" size={22} />
                    <p className="text-white">Download</p>
                  </a>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <div className="m-2 mt-3 mb-3">
                <CardTitle>
                  <h1 className="text-2xl font-semibold mb-4">
                    Dental X-Ray Analysis Results
                  </h1>
                </CardTitle>
                <ul className="space-y-2 pt-5 border-t-[1.5px] border-dashed mt-2 flex flex-wrap gap-3 items-center">
                  {chartData.classes.length > 0 ? (
                    chartData.classes.map((name, index) => (
                      <li
                        key={index}
                        className="flex flex-wrap gap-3 items-center"
                      >
                        <Badge
                          variant="outline"
                          className="py-2 hover:bg-primary hover:text-white cursor-pointer"
                        >
                          {name}
                        </Badge>
                        {explanations[name] ? (
                          <div className="p-4 bg-gray-50 border rounded-md">
                            {formatExplanation(explanations[name])}
                          </div>
                        ) : (
                          <Skeleton className="h-8 w-full md:w-[36rem] rounded-lg" />
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="text-center w-full flex items-center justify-center gap-2">
                      <IconInfoCircle className="text-gray-500" size={22} />
                      <p className="text-gray-500">
                        Please enter a dental X-ray image to see the analysis results.
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
        {loader ? (
          <Card className="w-full md:max-w-[43rem]">
            <CardHeader>
              <Skeleton className="h-[380px] w-full rounded-xl" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2 pt-5 border-t-[1.5px] border-dashed mt-2 flex flex-wrap gap-3 items-center">
                <Skeleton className="h-8 w-[13rem] rounded-lg" />
                <Skeleton className="h-8 w-[10rem] rounded-lg" />
                <Skeleton className="h-8 w-[10rem] rounded-lg" />
                <Skeleton className="h-8 w-[13rem] rounded-lg" />
                <Skeleton className="h-8 w-[10rem] rounded-lg" />
                <Skeleton className="h-8 w-[15rem] rounded-lg" />
                <Skeleton className="h-8 w-[10rem] rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ) : (null)}
        {invalidLink ? (
          <CardFooter>
            <CardDescription>
              <div className="flex items-center gap-4 bg-red-500/20 px-10 py-3 rounded-md">
                <FiAlertTriangle className="text-red-500 text-xl" />
                <p className="text-red-500">
                  Invalid link. Please enter a valid link
                </p>
              </div>
            </CardDescription>
          </CardFooter>
        ) : null}
      </div>
    </>
  );
};

export default Result;
