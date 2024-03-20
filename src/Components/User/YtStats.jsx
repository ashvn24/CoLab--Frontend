import React, { useEffect, useState } from "react";
import { axiosInstanceUser } from "../../Axios/Utils/axiosInstance";
import Loader from "./Utils/Loader";

const YtStats = () => {
  const [vdData, setVdData] = useState([]);
  const [isload, setIsload] = useState(true);
  useEffect(() => {
    getVdata();
  }, []);

  const getVdata = async () => {
    const channel_name = "UCoFId24HnrDZAnoXjFa_IMg";
    try {
      // await axiosInstanceUser
      //   .get("/yt/chdata/", {
      //     params: {
      //       channel_name: channel_name,
      //     },
      //   })
      //   .then((res) => {
      //     setVdData(res.data);
      //   });
    } catch (error) {
      console.log(error);
    } finally {
      setIsload(false);
    }
  };

  return (
    <div className="flex w-full flex-col h-4/6  mt-10 rounded-xl bg-dark-4 p- relative">
      {isload ? (
        <div className="flex flex-1 item-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-dark-3 item-center">
                <th style={{ width: "40%" }} className="p-4">
                  Title
                </th>
                <th style={{ width: "15%" }} className="p-4">
                  Views
                </th>
                <th style={{ width: "15%" }} className="p-4">
                  Likes
                </th>
                <th style={{ width: "15%" }} className="p-4">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              <>
                {vdData.map((item, index) => (
                  <tr key={index} className=" item-center">
                    <td style={{ width: "40%" }} className="p-4">
                      {item.title}
                    </td>
                    <td style={{ width: "15%" }} className="p-4">
                      {item.view_count}
                    </td>
                    <td style={{ width: "15%" }} className="p-4">
                      {item.like_count}
                    </td>
                    <td style={{ width: "15%" }} className="p-4">
                      {item.comment_count}
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default YtStats;
