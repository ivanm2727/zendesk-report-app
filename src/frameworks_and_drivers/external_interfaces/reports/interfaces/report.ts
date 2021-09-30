
interface IReportStatus {
    status: string,
    metaData: string
}

interface IReportRequestedRange {
  start: string,
  end: string
}

interface IFile {
  fileName: string,
  publicPath: string
}

export interface IReport {
  id: string,
  groups: string[],
  reportStatus: IReportStatus,
  requestedAt: string,
  requestedRange: IReportRequestedRange,
  requestedBy: string,
  requestedFormat: string,
  fileName: string,
  downloads: number,
  files: IFile[],
  createdAt: string | null,
  updatedAt: string | null,
  deletedAt: string | null
}

interface IListResponse {
  items: IReport[],
  total: number
}

export interface IGetReportsResponse {
  result: IListResponse,
  status: number
}