import React, { useState } from 'react';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { compareAsc, addDays } from 'date-fns';
import { Row, Col } from '@zendeskgarden/react-grid';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

const DatePick = () => {
  const [startValue, setStartValue] = useState(new Date());
  const [endValue, setEndValue] = useState(addDays(new Date(), 2));
  const isInvalid = () => compareAsc(startValue, endValue) === 1;

  return (
        <Col size={6}>
          <Row>
            <Col>
              <Field>
                <Label>From</Label>
                <Datepicker
                    value={startValue}
                    onChange={setStartValue}
                    formatDate={date => dateFormatter.format(date)}
                    >
                  <Input />
                </Datepicker>
              </Field>
            </Col>
            <Col>
              <Field>
                <Label>To</Label>
                <Datepicker
                    value={endValue}
                    onChange={setEndValue}
                    formatDate={date => dateFormatter.format(date)}
                    >
                  <Input validation={isInvalid() ? 'error' : undefined} />
                </Datepicker>
                {isInvalid() && (
                  <Message validation="error">End date must occur after the start date</Message>
                )}
              </Field>
            </Col>
          </Row>

        </Col>
  );
};

export default DatePick;