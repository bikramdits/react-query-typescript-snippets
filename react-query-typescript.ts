import { getAllVitals, getClientS, getItems } from "./../services/requests";
import axios, { AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import {
  createAudit,
  getMe,
  getAudits,
  getClients,
  IAuditsParams,
  IClientsParams,
  getPostalCodes,
  getClient,
  getStates,
  getPatients,
} from "services/requests";
import {
  IAddress,
  IAudit,
  IAxiosResponseWithPagination,
  IClient,
  IClientRepresentative,
  IFullClientType,
} from "types/entities";
import { IResetPasswordData, IResetPasswordEmail } from "types/auth";
import { ENDPOINTS } from "const/endpoints";
import {
  getAllConditions,
  getAllStates,
  getSingleProgram,
} from "modules/Program/Program.hooks";
import { getAllPartners } from "modules/Program/Program.service";

type IMeByIdQueryProps = Partial<UseQueryOptions<AxiosResponse<IFullProvider>>>;

export function useMe(props: IMeByIdQueryProps = {}) {
  return useQuery<
    AxiosResponse<IFullProvider>,
    any,
    AxiosResponse<IFullProvider>
  >(
    [ENDPOINTS.ME],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return getMe(source);
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 5000,
      suspense: true,
      props,
    }
  );
}

interface IAuditsQueryProps
  extends Partial<UseQueryOptions<IAxiosResponseWithPagination<IAudit>>>,
    Partial<IAuditsParams> {}

export function useAudits(props: IAuditsQueryProps = {}) {
  return useQuery<
    IAxiosResponseWithPagination<IAudit>,
    any,
    IAxiosResponseWithPagination<IAudit>
  >(
    [ENDPOINTS.AUDITS, ...props],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      return getAudits(props, source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );
}

interface IClientsQueryProps
  extends Partial<
      UseQueryOptions<
        IAxiosResponseWithPagination<
          IClient<IClientRepresentative<IHumanName>, IAddress>
        >,
        any
      >
    >,
    Partial<IClientsParams> {}

export function useClients(props: IClientsQueryProps = {}) {
  return useQuery<
    IAxiosResponseWithPagination<
      IClient<IClientRepresentative<IHumanName>, IAddress>
    >,
    any,
    IAxiosResponseWithPagination<
      IClient<IClientRepresentative<IHumanName>, IAddress>
    >
  >(
    [ENDPOINTS.CLIENTS, ...props],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return getClients(props, source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );
}

export function useClientS(props: IClientsQueryProps = {}) {
  return useQuery<
    IAxiosResponseWithPagination<
      IClient<IClientRepresentative<IHumanName>, IAddress>
    >,
    any,
    IAxiosResponseWithPagination<
      IClient<IClientRepresentative<IHumanName>, IAddress>
    >
  >(
    [
      ENDPOINTS.CLIENTS_ALL,
      ...props
    ],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return getClientS(
        props,
        source
      );
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );
}

export function useHealthConditions() {
  return useQuery<
    IAxiosResponseWithPagination<
      IClient<IClientRepresentative<IHumanName>, IAddress>
    >,
    any,
    IAxiosResponseWithPagination<
      IClient<IClientRepresentative<IHumanName>, IAddress>
    >
  >(
    [ENDPOINTS.PROGRAM_CONDITIONS],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return getAllConditions(source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
}

export function useStatesList() {
  return useQuery(
    [ENDPOINTS.STATES_LIST],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return getAllStates(source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );
}

export function useVitalItemList(id: string | undefined) {
  return useQuery(
    [ENDPOINTS.UNDER_PROGRAM_VITAL],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return getAllVitals(source, id);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );
}

export function useProgramData(id: any) {
  return useQuery(
    [`${ENDPOINTS.PROGRAMS}/${id}`],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return getSingleProgram(id, source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );
}
export function useAllPartners(props: IProgramsParams) {
  return useQuery<
    IAxiosResponseWithPagination<Partial<IFullProgram>>,
    any,
    IAxiosResponseWithPagination<Partial<IFullProgram>>
  >(
    [ENDPOINTS.ASSIGNEE, ...props],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      return getAllPartners(
        props,
        source
      );
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!client,
    }
  );
}

type ICreateAuditProps = Partial<
  UseMutationOptions<AxiosResponse<IAudit>, any, Partial<IAudit>>
>;

export function useCreateAudit({ ...rest }: ICreateAuditProps = {}) {
  return useMutation<AxiosResponse<IAudit>, any, Partial<IAudit>>(createAudit, {
    ...rest,
  });
}

interface IPostalCodeQueryProps
  extends Partial<UseQueryOptions<AxiosResponse<IPostalCode[]>>>,
    Partial<IPostalCode> {}

export function usePostalCodes({
  zipCode,
  ...rest
}: IPostalCodeQueryProps = {}) {
  return useQuery<
    AxiosResponse<IPostalCode[]>,
    any,
    AxiosResponse<IPostalCode[]>
  >(
    [ENDPOINTS.ZIP_CODES, zipCode],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      return getPostalCodes({ zipCode: zipCode || "" }, source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      ...rest,
    }
  );
}

interface IClientQueryProps
  extends Partial<UseQueryOptions<AxiosResponse<IFullClientType>>>,
    Partial<IFullClientType> {
  id?: string;
}

export function useClient({ id, ...rest }: IClientQueryProps) {
  return useQuery<
    AxiosResponse<IFullClientType>,
    any,
    AxiosResponse<IFullClientType>
  >(
    [ENDPOINTS.CLIENTS, id],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      return getClient(id, source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      suspense: true,
      enabled: !!id,
      ...rest,
    }
  );
}

interface IProviderQueryProps
  extends Partial<UseQueryOptions<AxiosResponse<IFullProvider>>>,
    Partial<IFullProvider> {
  id?: string;
}

interface IPatientQueryProps
  extends Partial<UseQueryOptions<AxiosResponse<IFullPatient>>>,
    Partial<IFullPatient> {
  id?: string;
}

export function usePatient({ id, ...rest }: IPatientQueryProps) {
  return useQuery<
    AxiosResponse<IFullPatient>,
    any,
    AxiosResponse<IFullPatient>
  >(
    [ENDPOINTS.PATIENTS, id],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      return getPatient(id, source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      suspense: true,
      enabled: !!id,
      ...rest,
    }
  );
}

type IStatesQueryProps = Partial<UseQueryOptions<AxiosResponse<string[]>>>;

export function useStates({ ...rest }: IStatesQueryProps = {}) {
  return useQuery<AxiosResponse<string[]>, any, AxiosResponse<string[]>>(
    [ENDPOINTS.STATES],
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      return getStates(source);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      ...rest,
    }
  );
}

interface IPatientsQueryProps
  extends UseQueryOptions<IAxiosResponseWithPagination<Partial<IFullPatient>>>,
    Partial<IPatientsParams> {}

