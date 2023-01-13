import axios from 'axios';
import { url } from '../constants/url';

export async function videoService(keyWord) {
  try {
    const response = await axios.get(`${url}/videos/search?query=${keyWord ? keyWord : '.'}&per_page=1`, {
      headers: {
        Authorization: '563492ad6f91700001000001ba2d72cd6b6f47b7bf913724813c22e8',
      }
    })
    
    return response.data?.videos[0]?.video_files || [];
  } catch (e) {
    console.log(e,"error")
  }
}