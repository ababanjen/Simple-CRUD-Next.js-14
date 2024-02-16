import Recycle from "../components/icons/recycle";
import { useApplicantStore } from "../store/applicantsStore";
import BrokenFile from "./icons/brokenFile";

const ArchivedApplicants = () => {
  const { applicants, retrive: onRetriveApplicant } = useApplicantStore();

  const hasArchive = applicants.some((applicant) => applicant.removed);

  return (
    <div className="flex flex-col gap-2  border rounded p-6 w-full">
      <span className="text-md font-semibold capitalize">Archive:</span>
      {hasArchive ? (
        <ul>
          {applicants.map(
            (applicant) =>
              applicant.removed && (
                <li
                  key={applicant.id}
                  className="flex items-center justify-between border-b p-4 w-full"
                >
                  <div className="flex flex-col ">
                    <span className="capitalize font-semibold text-base">
                      {applicant.firstName} {applicant.lastName}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm italic">
                        {applicant.email}
                      </span>
                      <span className="text-gray-500 text-sm italic">
                        {applicant.mobile}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <a
                      className=" text-sm  cursor-pointer hover:shadow-sm"
                      onClick={() =>
                        onRetriveApplicant(applicant.id, applicant.primary)
                      }
                    >
                      <Recycle />
                    </a>
                  </div>
                </li>
              )
          )}
        </ul>
      ) : (
        <span className="text-sm gap-2 italic text-gray-500 flex flex-col justify-center items-center h-full w-full">
          <span className="opacity-15 ">
            <BrokenFile />
          </span>
          <span>No archived applicants...</span>
        </span>
      )}
    </div>
  );
};

export default ArchivedApplicants;
