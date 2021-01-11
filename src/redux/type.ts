export interface CountryItemT {
  name: string;
  flag: string;
}

export interface CountryT {
  status: "SUCCESS" | "LOADING" | "FAILED" | null;
  data: CountryItemT;
}

export interface RootStateT {
  currentPage: CountryT;
}
