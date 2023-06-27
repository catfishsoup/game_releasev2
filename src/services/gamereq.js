import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL
const x_api_key = process.env.REACT_APP_X_API_KEY
let currDate = Math.round(new Date().setHours(0, 0, 0 , 0) / 1000) - 14400;

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

const getTrending = async() => await axios.request(getTrendingconfig)
.then((response) => {
 return (response.data);
})



let getReleasedconfig = {
  method: 'post',
  url: baseUrl,
  headers: { 
    'x-api-key': x_api_key, 
    'Content-Type': 'text/plain'
  },
  data : `fields name, release_dates.date, release_dates.human, cover.url; where release_dates.date = ${currDate}; sort release_dates.date asc; limit 5;`
}
const getReleased = () => axios.request(getReleasedconfig).then((res) => {return (res.data)})


async function getIncoming() {
  try {
    const res = await axios.request({
      method: 'post',
      url: baseUrl,
      headers: {
        'x-api-key': x_api_key,
        'Content-Type': 'text/plain'
      },
      data: `fields name, release_dates.date, release_dates.human, cover.url; where release_dates.date > ${currDate}; sort release_dates.date asc; limit 5;`
  });
    return (res.data);
  } catch (e) {
    console.log(e);
  }
}



async function getCurrent(id) {
  try {
    const res = await axios.request({
      method: 'post',
      url: baseUrl,
      headers: {
        'x-api-key': x_api_key,
        'Content-Type': 'text/plain'
      },
      data: `fields name, cover.url, genres.name, platforms.name, involved_companies.company.name, summary, videos.name, screenshots.url, release_dates.human, websites.url, websites.category, videos.name, videos.video_id; where id = ${id};`
    });
    return (res.data);
  } catch (e) {
    console.log(e);
  }
}

async function searchGame(name) {
  try {
    const res = await axios.request({
      method: 'post',
      url: baseUrl,
      headers: {
        'x-api-key': x_api_key,
        'Content-Type': 'text/plain'
      },
      data: `fields name, cover.url; search *"${name}"*; limit 500; where version_parent = null & platforms = (6, 7, 8, 9, 48, 49, 130, 167, 169);`
    });
    return (res.data);
  } catch(e) {
    console.log(e);
  }
}

export default {getPopular, getTrending, getReleased, getCurrent, searchGame, getIncoming}