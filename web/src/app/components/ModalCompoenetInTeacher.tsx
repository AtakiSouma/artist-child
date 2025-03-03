/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Modal } from "antd";
import React from "react";
import { TeachersData } from "../models/user.models";
type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  showModal: any;
  handleOk: any;
  handleCancel: any;
  item: TeachersData | null;
};
const ModalComponentInTeacher = (props: Props) => {
  const {
    setIsModalOpen,
    showModal,
    item,
    handleCancel,
    handleOk,
    isModalOpen,
  } = props;
  console.log(item);

  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (months are zero-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get the full year
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <Modal
        title="Profile"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col px-5">
          <div className="flex flex-col justify-center items-center">
            <div className="border-2 rounded-full">
              <img
                src={item?.photoUrl}
                alt={item?.avatar}
                className="h-24 object-contain rounded-full"
              />
            </div>
            <div className="mt-2 text-lg">{item?.name}</div>
          </div>
          <div className="grid grid-cols-5 mt-2">
            <div className="col-span-1 font-bold">Created: </div>
            <div className="col-span-4">
              {item && item.createdAt ? formatDate(item.createdAt) : ""}
            </div>
            <div className="col-span-1 font-bold">Role: </div>
            <div className="col-span-4">
              {item?.role === "6615424b73f8eddb58cfe6ac" ? (
                <span>Instructor</span>
              ) : (
                <span>Customer</span>
              )}
            </div>
            <div className="col-span-1 font-bold">Verification: </div>
            <div className="col-span-4">{item?.isCertified}</div>
          </div>
          <div className="mt-3 text-lg font-bold">Certifications:</div>
          <div className="grid grid-cols-2 gap-2 ">
            {item?.certificates.map((cert) => (
              <div className="col-span-1 ">
                <div className="mb-1">{cert.type}</div>
                <div className="min-h-32">
                  {cert.url ? (
                    <Image src={cert.url} alt={cert.url} className="border-2 rounded-md object-cover min-h-32"/>
                  ) : (
                    <div className="text-gray-400 h-32 flex justify-center items-center border-2 rounded-md">
                      <div>No Picture</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponentInTeacher;
