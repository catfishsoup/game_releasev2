import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL
const x_api_key = process.env.REACT_APP_X_API_KEY

// 
let getPopularconfig = {
  method: 'post',
  url: baseUrl,
  headers: { 
    'x-api-key': x_api_key, 
    'Content-Type': 'text/plain'
  },
  data : 'fields cover.url; where hypes > 120;'
};
const getPopular = () => axios.request(getPopularconfig)
.then((response) => {
 return (response.data);
}).catch((e) => {
  console.log(e);
});


// 
let getTrendingconfig = {
  method: 'post',
  url: baseUrl,
  headers: { 
    'x-api-key': x_api_key, 
    'Content-Type': 'text/plain'
  },
  data : 'fields name, hypes, cover.url; where hypes >= 150; sort hypes asc;'
};

const getTrending = () => axios.request(getTrendingconfig)
.then((response) => {
 return (response.data);
})


let currDate = Math.round(new Date().setHours(0, 0, 0 , 0) / 1000) - 14400;
let getReleasedconfig = {
  method: 'post',
  url: baseUrl,
  headers: { 
    'x-api-key': x_api_key, 
    'Content-Type': 'text/plain'
  },
  data : `fields name, release_dates.date, release_dates.human, cover.url; where release_dates.date = ${currDate}; sort release_dates.date asc;`
}
const getReleased = () => axios.request(getReleasedconfig).then((res) => {return (res.data)})

async function getCurrent(id) {
  try {
    const res = await axios.request({
      method: 'post',
      url: baseUrl,
      headers: {
        'x-api-key': x_api_key,
        'Content-Type': 'text/plain'
      },
      data: `fields name, cover.url, genres.name, platforms.name, involved_companies.company.name, summary, videos.name, screenshots.url, release_dates.human; where id = ${id};`
    });
    return (res.data);
  } catch (e) {
    console.log(e);
  }
}


export default {getPopular, getTrending, getReleased, getCurrent}