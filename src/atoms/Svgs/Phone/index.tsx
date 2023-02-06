import React from 'react';

type Props = {
  color?: string;
  width?: string;
  height?: string;
};

const PhoneSVG: React.FC<Props> = (props: Props) => {
  const { color, width, height } = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || '20'}
      height={height || '20'}
      fill='none'
      viewBox='4.21 8.72 28.31 29.4'
    >
      <path
        d='M13.0935 14.1771L11.9654 11.7767C10.8743 9.45507 7.89502 8.77193 5.9015 10.3862C4.69807 11.3608 4.00344 12.8323 4.25953 14.3595C4.77156 17.4131 6.28069 22.9208 10.7266 28.411C15.1785 33.9086 20.3424 36.6317 23.2755 37.8326C24.7345 38.4299 26.3538 38.0665 27.5791 37.0743C29.555 35.4742 29.512 32.4465 27.4914 30.9032L25.1251 29.0957C24.1281 28.3342 22.8154 28.1243 21.6306 28.5369C20.506 28.9286 19.2613 28.7591 18.374 27.9647C17.5478 27.2248 16.4512 26.1411 15.2942 24.7123C14.2135 23.3777 13.4723 22.2266 12.9839 21.3637C12.395 20.3235 12.4817 19.0701 13.029 18.0074C13.6471 16.8075 13.6676 15.3987 13.0935 14.1771Z'
        fill={color || '#94760A'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M27.855 14.5405C26.4099 12.756 24.6183 11.4869 22.4554 10.7158C21.9204 10.525 21.6413 9.93665 21.832 9.40159C22.0228 8.86653 22.6112 8.58743 23.1462 8.77819C25.665 9.67622 27.7708 11.1678 29.4536 13.2459C31.1365 15.3241 32.1576 17.6939 32.5124 20.3444C32.5877 20.9074 32.1924 21.4249 31.6293 21.5003C31.0663 21.5756 30.5488 21.1803 30.4735 20.6172C30.1689 18.3413 29.3 16.325 27.855 14.5405Z'
        fill={color || '#94760A'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M22.7953 18.4488C22.0295 17.5031 21.0125 16.8293 19.843 16.4928C19.2971 16.3358 18.9819 15.7659 19.139 15.22C19.296 14.6741 19.8659 14.3589 20.4118 14.5159C21.9863 14.9689 23.3629 15.881 24.394 17.1542C25.4251 18.4275 26.031 19.9637 26.1467 21.598C26.1868 22.1646 25.76 22.6565 25.1934 22.6966C24.6267 22.7367 24.1349 22.3099 24.0947 21.7433C24.0088 20.5294 23.5611 19.3945 22.7953 18.4488Z'
        fill={color || '#94760A'}
      />
    </svg>
  );
};

export default PhoneSVG;
