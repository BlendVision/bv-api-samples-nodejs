export class CreateVODRequestDTO {
  name: string;
  source: {
    type: string;
    library: {
      video: {
        id: string;
      };
      subtitles: string[];
    };
  };
  profile_set_id: string;
  queue: string;
  metadata: {
    long_description: string;
    short_description: string;
  };
  // player: {
  //   player_setting_id: string;
  // };
  security: {
    privacy: {
      type: string;
    };
    // watermark: {
    //   enabled: boolean;
    //   type: string;
    //   position: string;
    // };
    // domain_control: {
    //   enabled: boolean;
    //   domains: string[];
    // };
    // geo_control: string[];
  };
  pte: {
    profile: string;
  };
  // schedule: {
  //   enabled: boolean;
  //   start_time: string;
  //   end_time: string;
  // };
}
