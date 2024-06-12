import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate();

replicate.fetch = (url, options) => {
  return fetch(url, { cache: "no-store", ...options });
};

export async function GET(req: NextRequest, {params}: any) {
  const { id } = params;
  const prediction = await replicate.predictions.get(id);

  // const prediction = {
  //   "id": "v5mks04y4xrgp0cg166tzwhfz0",
  //   "model": "viktorfa/oot_diffusion",
  //   "version": "9f8fa4956970dde99689af7488157a30aa152e23953526a605df1d77598343d7",
  //   "input": {
  //       "garment_image": "https://api.replicate.com/v1/files/YTBmNmYzNTYtYTg1OC00M2RkLWFkOWMtMzA2ZDMwNDk2MmFh/download?expiry=1718150794&owner=juandavidgf&signature=EGgLTQuJG0yZXQaaSkDkPIy9YLUo9zdRq4%252B1rtXHBog%253D",
  //       "model_image": "https://api.replicate.com/v1/files/MjZjODllN2UtM2JiZC00ODUwLTk0ZWMtYWYyZmYzZWQyZGVi/download?expiry=1718150794&owner=juandavidgf&signature=fhsHsV34JENdxaPJnaTvAn3o3kjmiIfNR2OpnDOG76I%253D"
  //   },
  //   "logs": "Model parse in 0.44 seconds.\n0: 640x480 3 persons, 82.7ms\nSpeed: 10.7ms preprocess, 82.7ms inference, 267.8ms postprocess per image at shape (1, 3, 640, 480)\nOpen pose in 0.84 seconds.\nInitial seed: 0\n  0%|          | 0/20 [00:00<?, ?it/s]\n  5%|▌         | 1/20 [00:01<00:19,  1.05s/it]\n 10%|█         | 2/20 [00:01<00:16,  1.09it/s]\n 15%|█▌        | 3/20 [00:02<00:15,  1.13it/s]\n 20%|██        | 4/20 [00:03<00:13,  1.16it/s]\n 25%|██▌       | 5/20 [00:04<00:12,  1.18it/s]\n 30%|███       | 6/20 [00:05<00:11,  1.18it/s]\n 35%|███▌      | 7/20 [00:06<00:10,  1.19it/s]\n 40%|████      | 8/20 [00:06<00:10,  1.20it/s]\n 45%|████▌     | 9/20 [00:07<00:09,  1.20it/s]\n 50%|█████     | 10/20 [00:08<00:08,  1.21it/s]\n 55%|█████▌    | 11/20 [00:09<00:07,  1.21it/s]\n 60%|██████    | 12/20 [00:10<00:06,  1.21it/s]\n 65%|██████▌   | 13/20 [00:10<00:05,  1.21it/s]\n 70%|███████   | 14/20 [00:11<00:04,  1.21it/s]\n 75%|███████▌  | 15/20 [00:12<00:04,  1.21it/s]\n 80%|████████  | 16/20 [00:13<00:03,  1.21it/s]\n 85%|████████▌ | 17/20 [00:14<00:02,  1.21it/s]\n 90%|█████████ | 18/20 [00:15<00:01,  1.21it/s]\n 95%|█████████▌| 19/20 [00:15<00:00,  1.20it/s]\n100%|██████████| 20/20 [00:16<00:00,  1.20it/s]\n100%|██████████| 20/20 [00:16<00:00,  1.19it/s]\n",
  //   "output": [
  //       "https://replicate.delivery/pbxt/CPcfJcxlm2wNHKfVuPzHJVJ67jlS37JKBrlktNOE76QQso9SA/tmpfis3fruv.png",
  //       "https://replicate.delivery/pbxt/6eH7vZuGAbVHe0DjGIBlbBrMhQ3Jy7TUKjXCMc5bHffHxi2LB/tmpcxe6lk1e.png",
  //       "https://replicate.delivery/pbxt/ZWpGJsqWOHawPh0VZWYVdDBaMD2CpKAP3xxpYDrAzKdELavE/tmpjsmh3ltp.png",
  //       "https://replicate.delivery/pbxt/MPg1qFV1fmxbZaNW70LvhQ3Nu7w6MLYrlQoeRlfyQlDkYR7lA/tmpif9d1esh.png"
  //   ],
  //   "data_removed": false,
  //   "error": null,
  //   "status": "succeeded",
  //   "created_at": "2024-06-11T23:06:34.407Z",
  //   "started_at": "2024-06-11T23:08:41.877756Z",
  //   "completed_at": "2024-06-11T23:09:06.43677Z",
  //   "urls": {
  //       "cancel": "https://api.replicate.com/v1/predictions/v5mks04y4xrgp0cg166tzwhfz0/cancel",
  //       "get": "https://api.replicate.com/v1/predictions/v5mks04y4xrgp0cg166tzwhfz0"
  //   },
  //   "metrics": {
  //       "predict_time": 24.559014
  //   }
  // }

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction);
}