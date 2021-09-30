import { Row } from "@zendeskgarden/react-grid"
import React from "react"
import DateComponent from "../DateComponent"
import Dropdown from "../Dropdown"
import Generate from "../Generate"
import "./style.scss"

interface IGetReportProps {
  groupOptions: string[],
  formatOptions: string[],
  handleStartDateChange: (date: Date) => void,
  handleEndDateChange: (date: Date) => void,
  handleGroupChange: (groups: string[]) => void,
  handleFormatChange: (format: string) => void,
  handleOnClickButton: () => void
}

const GetReportComponent = (props: IGetReportProps) => {
  const { groupOptions, formatOptions } = props;
  const { handleStartDateChange, handleEndDateChange, handleGroupChange, handleFormatChange, handleOnClickButton } = props;
  return (
    <React.Fragment>
      <Row justifyContent="start" className='CreateReport__field'>
        <DateComponent 
          handleOnChangeStartDate={(date: Date) => {
            date.setHours(0);
            // setStartDate(date.toISOString())
            handleStartDateChange(date)
          }}
          handleOnChangeEndDate={(date: Date) => {
            date.setHours(12);
            // setEndDate(date.toISOString());
            handleEndDateChange(date)
          }}
        />
        <Dropdown 
          title='Select group'
          options={groupOptions}
          handleOnSelectItems={(selectedGroup: any) => {
            // setSelectedGroups(selectedGroup)
            handleGroupChange(selectedGroup);
          }} 
          isMultiselectField={true}       
        />
        <Dropdown 
          title='Select format'
          options={formatOptions}
          handleOnSelectItem={(selectedFormat: any) => {
            // setSelectedFormat(selectedFormat)
            handleFormatChange(selectedFormat)
          }} 
          isMultiselectField={false} 
        />
      </Row>
      <Generate handleOnClickButton={handleOnClickButton}/>
    </React.Fragment>
  )
}

export default GetReportComponent;
