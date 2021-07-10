import React, { useState, MouseEvent, HTMLAttributes} from 'react';
import {
  Notification,
  Title,
  Close,
  ToastProvider,
  useToast
} from '@zendeskgarden/react-notifications';
import { Col, Row } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';
import { Spinner } from '@zendeskgarden/react-loaders';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';


enum NotificationTypes {
  success = 'success',
  error = 'error',
  info = 'info'
}

enum NotificationTitles {
  success = 'Success',
  error = 'Error',
  info = 'Info'
}

enum NotificationBodies {
  success = 'Your reports have been generated succesfully',
  error = 'Status error: {{STATUS}}\n Error Description: {{DESCRIPTION}}',
  info = 'Your reports are being processed'
}

interface IGenerateProps {
  handleOnClickButton: any
}

interface IToastsProps extends IGenerateProps {}

const Toasts = (props: IToastsProps) => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const renderToasts = (type: NotificationTypes, title: NotificationTitles, body: NotificationBodies | string) => {
      addToast(
        ({ close }) => (
          <Notification type={type} style={{ maxWidth: 450 }}>
            <Title>{title}</Title>
              {body}
            <Close aria-label="Close" onClick={close} />
          </Notification>
        ),
        { placement: 'bottom' }
      );
    }

  const handleClick = async (event:MouseEvent,placement:string) => {
    event.preventDefault();
    console.log('Trayendo Reporte')
    setIsLoading(true);

    try{
      const response = await props.handleOnClickButton()
      console.log('Reporte creado')
      return renderToasts(NotificationTypes.success, NotificationTitles.success, NotificationBodies.success);
    } catch(error:any){
      if (error.response){
        console.log(error.response)
        const body = NotificationBodies.error
            .replace('{{STATUS}}', error.response.status)
            .replace('{{DESCRIPTION}}', error.response.statusText)
        return renderToasts(NotificationTypes.error, NotificationTitles.error, body);
      }
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
    <Row justifyContent="start">
        <Col size="2">
          <Button 
            // onClick={(event)=>handleClick(event,'bottom')} isStretched
            onClick={(event) => {
              handleClick(event, 'bottom') 
            }}
            isStretched
          >
            Generate Report
          </Button>
        </Col>
        {isLoading && <Spinner size="48"/> }
    </Row>
    <Row justifyContent='center'>
      {isLoading && <Col size='3'>
          <Notification type="info">
            <Title>{NotificationTitles.info}</Title>
              {NotificationBodies.info}
          </Notification>
        </Col>}
    </Row>
       
    </>
  );
};

const bottomProps = {
  style: { bottom: DEFAULT_THEME.space.base * 3 }
} as HTMLAttributes<HTMLDivElement>;

const placementProps = {
  'bottom-start': bottomProps,
  bottom: bottomProps,
  'bottom-end': bottomProps
};

const Generate = (props: IGenerateProps) => {
  return (
    <ToastProvider placementProps={placementProps}>
      <Toasts handleOnClickButton={props.handleOnClickButton}/>
    </ToastProvider>
  )
}

export default Generate


