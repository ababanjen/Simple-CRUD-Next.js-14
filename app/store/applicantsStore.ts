import { create } from 'zustand'

export type applicantFormType = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: number | string;
}
export type applicantType = {
  id: number | string;
  primary: boolean;
  removed: boolean;
} & applicantFormType;

type applicantList = applicantType[];

const testList: applicantList = [...Array(5)].map((_, id) => ({
  id,
  firstName: `Bea${id + 1}`,
  lastName: `Smith${id + 1}`,
  email: `testmail${id + 1}@gmail.com`,
  mobile: 234567898,
  primary: id === 2,
  removed: false,
}));

type ApplicantsStoreType = {
  applicants: applicantList,
  updateApplicant: null | applicantType,
  setUpdateApplicant: (data: applicantType | null) => void,
  add: (data: applicantFormType) => void,
  update: (data: applicantType) => void,
  remove: (id: string | number, primary: boolean) => void,
  retrive: (id: string | number, primary: boolean) => void,
  setPrimary: (id: string | number) => void,
}


const onRemoveRetriveApplicant = (
  id: string | number,
  state: applicantList,
  action?: "remove" | "retrive"
) =>
  state.map((applicant) => {
    if (applicant.id === id)
      return {
        ...applicant,
        removed: action === "remove",
      };
    return applicant;
  })

const onAddApplicant = (state: applicantList, newApplicant: applicantFormType) => {
  return [...state, {
    ...newApplicant,
    id: state.length + 1,
    primary: false,
    removed: false,
  }]
}

const onUpdateApplicant = (state: applicantList, updatedDetails: applicantType) => {
  return state.map(applicant => {
    if (applicant.id === updatedDetails.id) {
      return updatedDetails
    }
    return applicant
  })
}

export const useApplicantStore = create<ApplicantsStoreType>((set) => ({
  applicants: testList,
  updateApplicant: null,
  setUpdateApplicant: (formData: applicantType | null) => set(() => ({ updateApplicant: formData })),
  add: (formData: applicantFormType) => set((state) => ({
    applicants: onAddApplicant(state.applicants, formData)
  })),
  update: (formData: applicantType) => set((state) => ({
    applicants: onUpdateApplicant(state.applicants, formData)
  })),
  remove: (id: string | number,
    primary: boolean,) => primary ? null : set((state) => ({ applicants: onRemoveRetriveApplicant(id, state.applicants, "remove") })),
  retrive: (id: string | number,
    primary: boolean,) => primary ? null : set((state) => ({ applicants: onRemoveRetriveApplicant(id, state.applicants) })),
  setPrimary: (id: string | number) => set((state) => ({
    applicants: state.applicants.map((applicant) => ({
      ...applicant,
      primary: id === applicant.id,
    }))
  }))
}));