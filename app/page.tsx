"use client";
import ArchivedApplicants from "./components/ArchivedApplicants";
import Applicants from "./components/Applicants";
import ApplicantForm from "./components/Form/Applicant";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center mx-6 my-4">
        <span className="capitalize text-lg font-semibold w-full flex justify-center">
          Applicant details
        </span>
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <Applicants />
        <ArchivedApplicants />
        <ApplicantForm />
      </div>
    </div>
  );
}
