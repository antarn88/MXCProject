import { ILoadingProps } from '../../interfaces/loading/loading-props.interface';
import './Loading.scss';

const Loading = ({ loadingText }: ILoadingProps): JSX.Element => {
  return (
    <div className="loading-screen" data-testid="loading-screen">
      <div className="spinner-border"></div>
      <h5 className="ml-5">{loadingText}</h5>
    </div>
  );
};

export default Loading;
