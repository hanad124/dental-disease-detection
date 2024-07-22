import React from "react";
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
  const noImageData = !image || Object.keys(image).length === 0;

  console.log("image", image);

  return (
    <>
      <div className="px-4 md:px-0  w-full flex justify-center my-10">
        {noImageData ? null : (
          <Card className=" w-full md:w-[43rem]">
            <CardHeader>
              <Image
                src={image || coverPhoto}
                height={300}
                width={400}
                alt={"inference result"}
                className="max-h-[480px] w-full rounded-xl"
              />
            </CardHeader>

            <CardContent>
              <div className=" m-2 mt-3 mb-3">
                <CardTitle>
                  <h1 className="text-2xl font-semibold mb-4">
                    Inference Results
                  </h1>
                </CardTitle>
                {/* 
                display the chart data as list items
                 */}
                <ul className="space-y-2 pt-5 border-t-[1.5px] border-dashed mt-2 flex flex-wrap gap-3 items-center">
                  {chartData.classes.map((name, index) => (
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

                      {/* <p>{chartData.confidences[index].toFixed(2)}</p> */}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
        {loader ? (
          <Card className="w-full md: max-w-[43rem]">
            <CardHeader>
              <Skeleton className="h-[380px] w-full rounded-xl" />
            </CardHeader>
            {/* chart skeleton */}
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
        ) : null}
        {invalidLink ? (
          <>
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
          </>
        ) : null}
      </div>
    </>
  );
};

export default Result;
