"use client";
import { useApplicantStore, applicantType } from "@/app/store/applicantsStore";
import { useEffect, useState } from "react";
import InputLabel from "../FormComponents/InputLabel";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  id: "",
  primary: false,
  removed: false,
};

const ApplicantForm = () => {
  const [form, setForm] = useState<applicantType>(initialForm);

  const {
    applicants,
    updateApplicant,
    add: onAddApplicant,

    update: onUpdateApplicant,
    setUpdateApplicant,
  } = useApplicantStore();

  useEffect(() => {
    if (updateApplicant) {
      const result: any = applicants.find(
        (applicant) => applicant.id === updateApplicant.id
      );
      setForm(result);
    }
  }, [updateApplicant, applicants]);

  const handleFieldChange = ({
    target: { value, name },
  }: {
    target: { value: any; name: string };
  }) =>
    setForm({
      ...form,
      [name]: value,
    });

  const onClearForm = () => {
    setUpdateApplicant(null);
    setForm(initialForm);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (updateApplicant) {
      //Update
      onUpdateApplicant(form);
    } else {
      //Add
      onAddApplicant(form);
    }
    onClearForm();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex gap-2 flex-col w-full bg-gray-100 p-4 h-max rounded"
    >
      <span className="text-md font-semibold capitalize">
        {!!updateApplicant ? "Update applicant" : "Add new applicant"}
      </span>
      <div className="flex gap-2 flex-col justify-center">
        <div className="flex flex-col md:flex-row gap-2">
          <InputLabel
            label="First Name"
            inputProps={{
              type: "text",
              name: "firstName",
              required: true,
              value: form?.firstName,
              onChange: handleFieldChange,
            }}
          />
          <InputLabel
            label="Last Name"
            inputProps={{
              type: "text",
              name: "lastName",
              required: true,
              value: form?.lastName,
              onChange: handleFieldChange,
            }}
          />
        </div>
        <div className="flex gap-2 flex-col md:flex-row">
          <InputLabel
            label="email"
            inputProps={{
              type: "email",
              name: "email",
              required: true,
              value: form?.email,
              onChange: handleFieldChange,
            }}
          />
          <InputLabel
            label="mobile"
            inputProps={{
              type: "number",
              name: "mobile",
              required: true,
              value: form?.mobile,
              onChange: handleFieldChange,
            }}
          />
        </div>
        <div className="w-full flex flex-col gap-2 mt-4">
          {!!updateApplicant && (
            <button
              type="button"
              className=" p-4 text-sm border text-gray-600 hover:text-white hover:bg-gray-300 cursor-pointer rounded w-full"
              onClick={onClearForm}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className=" p-4 text-sm bg-blue-400 text-white hover:bg-blue-500 cursor-pointer rounded w-full"
          >
            {!!updateApplicant ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplicantForm;
