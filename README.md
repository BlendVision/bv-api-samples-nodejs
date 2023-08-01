# Sample VOD Upload and Playback Server with NestJS 

## Introduction
This document describes the backend service for interacting with BlendVision One, including functionalities like obtaining playback tokens, file uploads, and retrieving VODs.

## System Requirements
Node.js v16+
NestJS v9+
BlendVision One API key and organization ID configuration

## Getting Started:
Before running the VOD Upload and Playback Server, please follow these steps:

1. Obtain BlendVision One Credentials: To use the BlendVision One API, you'll need to sign up for an account on the BlendVision One Console. Once registered, you can obtain your org_id and api_key, which are required for authenticating requests to the API.
    * org_id: https://docs.one-stage.kkstream.io/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicAccountService_Get
    * api_key: https://docs.one-stage.kkstream.io/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicAccountService_CreateAPIToken

2. Configure the Service: Fill in your BlendVision One org_id, api_key, and other relevant details in the configuration file provided with this repository.

3. Start the Server: After configuring the service, start the server by running the appropriate commands, and you'll be ready to upload and stream your video content seamlessly.

### Installation & Configuration

```bash
$ npm install
```

```env
// config.yaml
BV_ONE_URL=https://api.blendvision.one
BV_ONE_ORG_ID=your_org_id
BV_ONE_API_KEY=your_api_key
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Reference

### File Upload
[![](https://mermaid.ink/img/pako:eNqVUktPAjEQ_iuTnjSBbAy3HkwgelMxrHAwXIbuwDZuH7ZdjBr_u9NdUERj9NJMZ75HH9-rUK4iIUWkx5asoguNm4BmaQE8hqSV9mgTjL0HjDCPFHJ9PC4pbLWiDJmgeiBb7VvHyMliantcw6iFjtpZ4NY3xVEGjQ2-8Lwc5TH7Ds_Pd7oSCmVisT0rGr0KGJ6LtW4oytY3DquTtQtmWGFCmdunmb4jskR3Bgm30_LuV5XM6rDDQ98ZRe9sJHjSqQYfKOqNpQrms6uvNuWIPeZ3EPLTxgTJ_YAefdGed77M6C3-eexCKmd8Q4mGf7nAoTrP-XnzLLXBQpaDXgNiqxTFCIYX3HSsG5cI3Jaz8CGqMKn6MgQXYNU49QD8A0DdvkZbNdpuxEAYCgZ1xXl7zTpLkWoytBSSy6daJy6X9o2B2CZXPlslZAotDUTr-TP34RRyjU3kLlU6uXDdJ7gL8kBweu6d-8T0zMsOuWu-vQNH4wex?type=png)](https://mermaid.live/edit#pako:eNqVUktPAjEQ_iuTnjSBbAy3HkwgelMxrHAwXIbuwDZuH7ZdjBr_u9NdUERj9NJMZ75HH9-rUK4iIUWkx5asoguNm4BmaQE8hqSV9mgTjL0HjDCPFHJ9PC4pbLWiDJmgeiBb7VvHyMliantcw6iFjtpZ4NY3xVEGjQ2-8Lwc5TH7Ds_Pd7oSCmVisT0rGr0KGJ6LtW4oytY3DquTtQtmWGFCmdunmb4jskR3Bgm30_LuV5XM6rDDQ98ZRe9sJHjSqQYfKOqNpQrms6uvNuWIPeZ3EPLTxgTJ_YAefdGed77M6C3-eexCKmd8Q4mGf7nAoTrP-XnzLLXBQpaDXgNiqxTFCIYX3HSsG5cI3Jaz8CGqMKn6MgQXYNU49QD8A0DdvkZbNdpuxEAYCgZ1xXl7zTpLkWoytBSSy6daJy6X9o2B2CZXPlslZAotDUTr-TP34RRyjU3kLlU6uXDdJ7gL8kBweu6d-8T0zMsOuWu-vQNH4wex)

#### File Upload
* Method: POST
* Path: /cms/v1/library/files:upload
* Body:
    |  key   | value  |
    |  ----  | ----  |
    | file  | yourMP4.mp4 |
* Description: 
  * Simple integration of the following 3 APIs, please modify according to actual needs
  * Upload files using form-data
  * Upload a file to BlendVision One and send file information to Amazon S3.
  * BlendVision One API document:
    1. https://docs.one-stage.kkstream.io/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicCMSService_UploadFile
    2. https://docs.one-stage.kkstream.io/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicCMSService_CompleteUploadFile

### Create VOD
[![](https://mermaid.ink/img/pako:eNqF0k1LxDAQBuC_EubcpXjNYcHdLp6kYrUHyWVMZjXYJjUfBVn2v5t-LK614Kll-szkLZMTSKsIOHj6jGQkFRrfHLbCMNahC1rqDk1g-0ZTeqBnz54cu-26pajI9VrSQHYoP8ioS2kpd3VpJtckVWuvrWGpJMwgp5M22-3czdlDWT2x_LXPZevz_ibvrfKDnEGi48QLXKjx2-Z6Xl0WbO8IA6nrMYlMZ3P2SCE68xuuZ7s7_ImWc61W4412Ba4nLDDg__EmBRm05FrUKm3yNHQJCO_UkgCeXhUdMTZBgDDnRDEGW30ZCTy4SBnETqVfnBcP_IiNT1VSOlh3P92O8ZJkkNb3Yu2PmToPo5yL52_6jsia?type=png)](https://mermaid.live/edit#pako:eNqF0k1LxDAQBuC_EubcpXjNYcHdLp6kYrUHyWVMZjXYJjUfBVn2v5t-LK614Kll-szkLZMTSKsIOHj6jGQkFRrfHLbCMNahC1rqDk1g-0ZTeqBnz54cu-26pajI9VrSQHYoP8ioS2kpd3VpJtckVWuvrWGpJMwgp5M22-3czdlDWT2x_LXPZevz_ibvrfKDnEGi48QLXKjx2-Z6Xl0WbO8IA6nrMYlMZ3P2SCE68xuuZ7s7_ImWc61W4412Ba4nLDDg__EmBRm05FrUKm3yNHQJCO_UkgCeXhUdMTZBgDDnRDEGW30ZCTy4SBnETqVfnBcP_IiNT1VSOlh3P92O8ZJkkNb3Yu2PmToPo5yL52_6jsia)

#### Create a VOD
* Method: POST
* Path: /cms/v1/vods
* Body:
  ```
  {
    "profile_set_id": "profile_set_id",
    "queue": "QUEUE_STANDARD",
    "pte": {
      "profile": "PTE_PROFILE_UNSPECIFIED"
    },
    "security": {
      "privacy": {
        "type": "SECURITY_PRIVACY_TYPE_PUBLIC"
      }
    },
    "metadata": {
      "long_description": "",
      "short_description": ""
    },
    "name": "your_vod_name",
    "source": {
      "type": "SOURCE_TYPE_LIBRARY",
      "library": {
        "video": {
          "id": "upload_file_id"
        },
        "subtitles": []
      }
    }
  }
  ```
* Description: 
  * Change DRM settings in "security"
  * BlendVision One API document:
    1. https://docs.one.blendvision.com/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicCMSService_CreateVOD

#### Get a VOD
* Method: GET
* Path: /cms/v1/vods/{VODID}
* Description: 
  * BlendVision One API document:
    1. https://docs.one.blendvision.com/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicCMSService_GetVOD

### Playback
![](https://lh6.googleusercontent.com/PEtxFvRlKbDWqshJ37ahEgPmeD6qwHc3n8svL7r84MeccvXI07Q1yJKga-Sia2DXTJ-2DZvq6dBVM-xs4ytsjtDdcle0JI6EF7RXZMr1AnXS1JIplWD8YAAmf7OfIBnBZOLqsrsBCg1VCzH-DkMZm18)
* The resource token request can be skipped
* At least need to implement playback token, start session, stream info
* Quickstart: Playback a BlendVision One Stream: https://support.one.blendvision.com/hc/en-us/articles/19704999298457-Quickstart-Playback-a-BlendVision-One-Stream

#### Create Playback Token
* Method: POST
* Path: /cms/v1/tokens
* Body:
  ```
  {
    "resource_id": "your_vod_id",
    "resource_type": "RESOURCE_TYPE_VOD"
  }
  ```
* Description: 
  * Get a playback token from BlendVision One.
  * BlendVision One API document:
    * https://docs.one-stage.kkstream.io/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicCMSService_CreatePlaybackToken

#### Start Playback Session
* Method: POST
* Path: /playback/v1/sessions/:device_id:start
* Headers:
  * authorization: your_playback_token
* Body: 
  ```
  {}
  ```
* Description: 
  * Start a playback session from BlendVision One.
  * BlendVision One API document:
    * https://docs.one-stage.kkstream.io/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicPlaybackService_StartSession

#### Get Playback Session Info
* Method: GET
* Path: /playback/v1/sessions/:device_id
* Headers:
  * authorization: your_playback_token
* Body: 
  ```
  {}
  ```
* Description: 
  * Retrieve playback session info from BlendVision One.
  * BlendVision One API document:
    * https://docs.one-stage.kkstream.io/api/bv/v1.78.1/ui/elements/index.html#/operations/PublicPlaybackService_GetSessionInfo

## Error Handling
All APIs use error catching to handle potential exceptions. Please modify according to actual needs.