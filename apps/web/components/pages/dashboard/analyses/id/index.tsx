import DashboardAnalysesIDAIFeedback from './ai-feedback';
import DashboardAnalysesIDHeading from './heading';
import DashboardAnalysesIDIssues from './issues';
import DashboardAnalysesIDQuickWins from './quick-wins';
import DashboardAnalysesIDScores from './scores';
import DashboardAnalysesIDScreenshot from './screenshot';
import DashboardAnalysesIDSteps from './steps';
import { AnalysisData } from './types';
import { mockAnalysis } from './utils';

const DashboardAnalysesID = ({
  data = mockAnalysis,
}: {
  data?: AnalysisData;
}) => {
  return (
    <div className='bg-bg flex min-h-screen w-full flex-col'>
      <DashboardAnalysesIDHeading url={data.url} />

      <DashboardAnalysesIDSteps steps={data.steps} />

      <div className='flex flex-1 flex-col md:h-[calc(100vh-108px)] md:flex-row'>
        <div className='md:border-border-subtle flex-1 md:overflow-y-auto md:border-r'>
          <DashboardAnalysesIDScores scores={data.scores} />

          <DashboardAnalysesIDScreenshot
            siteTagline={data.siteTagline}
            siteTitle={data.siteTitle}
            url={data.url}
          />

          <DashboardAnalysesIDIssues issues={data.issues} />
        </div>

        <div className='w-full md:w-95 md:overflow-y-auto'>
          <DashboardAnalysesIDAIFeedback aiFeedback={data.aiFeedback} />

          <DashboardAnalysesIDQuickWins quickWins={data.quickWins} />
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalysesID;
