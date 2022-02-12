import React from 'react';
import { AllFellowship } from 'interfaces/fellowship';
import Button from './Button';

type Props = {
  fellowship: AllFellowship;
  onChange: (fellowship: AllFellowship) => void;
};

const FellowshipControls: React.FC<Props> = props => (
  <div>
    <h2>Fellowship Types</h2>
    <div style={{ display: 'flex' }}>
      <FellowshipButton type="all" {...props} />
      <FellowshipButton type="angels" {...props} />
      <FellowshipButton type="founders" {...props} />
      <FellowshipButton type="writers" {...props} />
    </div>
  </div>
);

export default FellowshipControls;

type FellowshipButtonProps = {
  fellowship: AllFellowship;
  type: AllFellowship;
  onChange: (fellowship: AllFellowship) => void;
};

const FellowshipButton: React.FC<FellowshipButtonProps> = ({
  fellowship,
  type,
  onChange
}) => (
  <Button active={fellowship === type} onClick={() => onChange(type)}>
    {type}
  </Button>
);
