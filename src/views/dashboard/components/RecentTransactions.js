import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { Typography, Link } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';

const RecentTransactions = () => {
  return (
    <DashboardCard title="Recent Trades">
      <>
        <Timeline
          sx={{
            p: 0,
            mb: 0,
            '& .MuiTimelineItem-root': {
            p: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent>10:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Buy XAUUSD</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Entry: 1925.50 | Exit: 1930.75 | +52 pips
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>09:15 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Sell GBPUSD</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Entry: 1.2650 | Exit: 1.2605 | -45 pips
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>08:45 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Buy EURUSD</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Entry: 1.0850 | Exit: 1.0880 | +30 pips
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>08:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">Sell USDJPY</Typography>
              <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                Entry: 151.50 | Exit: 151.20 | +30 pips
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;
