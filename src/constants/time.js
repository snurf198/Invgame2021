export const OT_TIME = 1 * 1000;
export const ROUND1_VIDEO = 1 * 10 * 1000;
export const ROUND1_INVEST = 1 * 60 * 1000;
export const ROUND2_VIDEO = 1 * 60 * 1000;
export const ROUND2_INVEST = 1 * 60 * 1000;
export const ROUND3_VIDEO = 1 * 60 * 1000;
export const ROUND3_INVEST = 1 * 60 * 1000;
export const FINAL_VIDEO = 1 * 60 * 1000;
export const FINAL_INVEST = 1 * 60 * 1000;
export const FINAL_REDIRECTION = 1 * 60 * 1000;

export const START_TIME = new Date('January 27, 2021 20:15:00').getTime();

export const ACC_ROUND1_VIDEO_OFFSET = ROUND1_VIDEO;
export const ACC_ROUND1_INVEST_OFFSET = ACC_ROUND1_VIDEO_OFFSET + ROUND1_INVEST;
export const ACC_ROUND2_VIDEO_OFFSET = ACC_ROUND1_INVEST_OFFSET + ROUND2_VIDEO;
export const ACC_ROUND2_INVEST_OFFSET = ACC_ROUND2_VIDEO_OFFSET + ROUND2_INVEST;
export const ACC_ROUND3_VIDEO_OFFSET = ACC_ROUND2_INVEST_OFFSET + ROUND3_VIDEO;
export const ACC_ROUND3_INVEST_OFFSET = ACC_ROUND3_VIDEO_OFFSET + ROUND3_INVEST;
export const ACC_FINAL_VIDEO_OFFSET = ACC_ROUND3_INVEST_OFFSET + FINAL_VIDEO;
export const ACC_FINAL_INVEST_OFFSET = ACC_FINAL_VIDEO_OFFSET + FINAL_INVEST;
export const ACC_FINAL_REDIRECTION_OFFSET = ACC_FINAL_INVEST_OFFSET + FINAL_REDIRECTION;