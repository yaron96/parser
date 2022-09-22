import axios, { AxiosResponse } from "axios";
import { load } from "cheerio";

export interface TeamMember {
  firstName: string,
  position: string,
  about: string,
}

export class Parser {
  private targetUrl: string = 'https://jetup.digital/team';
  private response: AxiosResponse;
  private delayMs: number = 1000;
  private attemps: number = Infinity;

  constructor(delayMs: number, attemps: number) {
    this.delayMs = delayMs;
    this.attemps = attemps;
  }

  async getTeamMembers() {
    await retryer(this.getResponse.bind(this), this.attemps, this.delayMs);

    const members: TeamMember[] = [];
    if (this.response.status === 200) {
      const body = this.response.data;
      let $ = load(body);
      const targetDivEl = $('#page-body>.container>.row>div>div');
      const memberDivArr = targetDivEl.children();
      memberDivArr.each((_, el) => {
        const firstName = $(el).children('h2').text();
        const position = $(el).children('h3').text();
        const about = $(el).children('p').text().trim();
        members.push({
          firstName,
          position,
          about,
        });
      });
    }
    return members;
  }

  private async getResponse() {
    try {
      const response = await axios(this.targetUrl);
      this.response = response;
    } catch (e) {
      throw e;
    }
  }
}

async function retryer(
  fn: () => Promise<any>,
  maxAttemps: number,
  delayMs: number,
  currentAttemp: number = 0,
) {
  try {
    await fn();
  } catch (e) {
    if (maxAttemps === currentAttemp) {
      throw e;
    }

    console.log(
      `connection failed, ${currentAttemp + 1} times, waiting ${delayMs}ms`,
    );
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return retryer(fn, maxAttemps, delayMs * 2, currentAttemp + 1);
  }
}
