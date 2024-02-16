import Delete from "../components/icons/delete";
import clsx from "clsx";
import { useApplicantStore } from "../store/applicantsStore";
import Edit from "./icons/edit";

const Applicants = () => {
  const {
    applicants,
    updateApplicant,
    setUpdateApplicant,
    remove: onRemoveApplicant,
    setPrimary: setAsprimaryApplicant,
  } = useApplicantStore();

  return (
    <div className="flex flex-col gap-2  border rounded p-6 w-full">
      <span className="text-md font-semibold capitalize">Applicants:</span>
      <ul>
        {applicants.map(
          (applicant) =>
            !applicant.removed && (
              <li
                key={applicant.id}
                className="flex flex-col md:flex-row md:items-center justify-between border-b p-2 md:p-4 w-full"
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
                <div className="flex gap-2 justify-end items-center">
                  {applicant.primary ? (
                    <span className="text-gray-400 text-xs italic">
                      Primary
                    </span>
                  ) : (
                    <a
                      className={clsx({
                        "rounded text-[#00d0ffcf] text-xs hover:underline cursor-pointer":
                          true,
                        hidden: updateApplicant?.id === applicant.id,
                      })}
                      onClick={() => setAsprimaryApplicant(applicant.id)}
                    >
                      Set as primary
                    </a>
                  )}
                  <a
                    className={"text-sm hover:shadow-sm cursor-pointer"}
                    onClick={() => setUpdateApplicant(applicant)}
                  >
                    <Edit active={updateApplicant?.id === applicant.id} />
                  </a>
                  <a
                    className={clsx({
                      "text-sm hover:shadow-sm cursor-pointer":
                        !applicant.primary,
                      hidden:
                        applicant.primary ||
                        updateApplicant?.id === applicant.id,
                    })}
                    onClick={() =>
                      onRemoveApplicant(applicant.id, applicant.primary)
                    }
                  >
                    <Delete />
                  </a>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Applicants;
