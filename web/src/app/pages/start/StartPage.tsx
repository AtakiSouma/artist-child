import React, { useState } from "react";
import { ImagesComponents } from "../../components";
import { Button, Divider, Image, Typography, UploadProps, message } from "antd";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser.hooks";

const StartPage = () => {
  const [isNext, setIsNext] = useState(false);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();
  const { handleSubmitCerts } = useUser();
  const [list, setList] = useState({
    listCerts: [
      { type: "High School Diploma", url: "" },
      { type: "Bachelor's degree", url: "" },
      { type: "English Certification", url: "" },
    ],
  });

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (_e: any) => {
        const newList = [...list.listCerts];
        newList[index].url = reader.result as string; 
        setList({ listCerts: newList });
      };
      reader.readAsDataURL(file);
      // const imageUrl = URL.createObjectURL(file);
      // const newList = [...list.listCerts];
      // newList[index].url = imageUrl;
    }
  };

  const handleSubmit = async () => {
    console.log(list);
    handleSubmitCerts(list, navigate);
  };

  return (
    <div className="bg-[#77B0AA] bg-gradient-to-r flex  from-[#77B0AA] to-[#135D66] items-center justify-center min-h-screen w-full">
      {!isNext ? (
        <div
          className="grid grid-cols-5 relative shadow-md  drop-shadow-2xl rounded-sm bg-[#ffffff]
      overflow-hidden w-[1200px] max-w-[100%] min-h-[480px] h-[65%] mx-10"
        >
          <div className="w-full h-full flex-col flex-1  hidden md:block lg:block 2xl:block col-span-3">
            <ImagesComponents
              width={"100%"}
              height={"520px"}
              photoUrl={
                "https://i.pinimg.com/originals/f1/cb/40/f1cb40e09c54d0b658a8610acde444c2.png"
              }
            />
          </div>
          <div className="flex flex-col items-center justify-center  shadow-2xl px-16 md:px-16 text-center col-span-2">
            <h1 className="font-[800] text-5xl text-[#000000] ">Welcome</h1>
            <Divider />
            <Typography>
              Thank you for choosing our platform in order to share your
              knowledges to the youths.
            </Typography>
            <Typography>
              In order to continue, we need to verify your application.
            </Typography>
            <Button
              className="bg-purple border-none hover:text-pretty w-full mt-5"
              htmlType="submit"
              size="large"
              type="primary"
              onClick={() => setIsNext(true)}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col relative shadow-md  drop-shadow-2xl rounded-sm bg-[#ffffff]
        overflow-hidden w-[1200px] max-w-[100%] min-h-[480px] h-[65%] mx-10 p-8"
        >
          <h1 className="font-[800] text-5xl text-[#000000] text-center">
            Certification
          </h1>
          <form className="grid grid-cols-3 gap-4 my-5 ">
            {list.listCerts.map((cert, index) => (
              <div key={index}>
                <label className="w-[45%]">{cert.type}</label>
                <input
                  type="file"
                  accept="image/*"
                  id={`file-${index}`}
                  className="hidden"
                  onChange={(event) => handleFileChange(index, event)}
                />
                <label
                  htmlFor={`file-${index}`}
                  className={`w-full h-72 rounded-lg border-[#00000026] p-3 
            border flex items-center justify-center
            ${dragging ? "bg-[#135D66]" : "bg-transparent"}
            `}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {cert.url ? (
                    <div>
                      <Image
                        src={cert.url}
                        alt=""
                        className=" w-full object-cover rounded-lg max-h-64"
                      />
                    </div>
                  ) : (
                    <>
                      <span className="text-black  text-center, self-center">
                        Drag or drop the images here, or click here to browse
                      </span>
                    </>
                  )}
                </label>
              </div>
            ))}
          </form>
          <Button
            className="bg-purple border-none hover:text-pretty  mx-96"
            htmlType="submit"
            size="large"
            type="primary"
            onClick={() => handleSubmit()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default StartPage;
