import { faker } from "@faker-js/faker";

export function oneOf(array) {
  const rand = Math.ceil(Math.random() * (array.length - 1));
  return array[rand];
}

export function betweenNumber(min, max, roundDigit = 1) {
  let val = Math.random() * (max - min) + min;
  val /= Math.pow(10, roundDigit);
  val = Math.round(val) * Math.pow(10, roundDigit);
  return val;
}

export function generateCatalogues(length) {
  const fakeImages = [
    "https://m.media-amazon.com/images/I/81OivyiwCjL._AC_UF894,1000_QL80_.jpg",
    "https://media.suara.com/pictures/original/2020/06/01/49976-samsung-galaxy-book-s-dengan-chipset-dari-intel-samsung-newsroom.jpg",
    "https://images.samsung.com/is/image/samsung/p6pim/id/feature/151613152/id-feature-go-simple-work-smarter--496089993?$FB_TYPE_A_MO_JPG$",
    "https://img.ws.mms.shopee.co.id/8f97b9259db33f29a9624dfca1588d27",
    "https://www.jagatreview.com/wp-content/uploads/2012/09/Samsung-Ultrathin_NP535_U3C_2.jpg",
    "https://ds393qgzrxwzn.cloudfront.net/resize/m500x500/cat1/img/images/0/0lZKCYkH1c.jpg",
    "https://www.digitaltrends.com/wp-content/uploads/2021/11/macbook-pro-2021-01.jpg?p=1",
    "https://digitek.id/wp-content/uploads/2020/04/Lenovo-ThinkPad-X1-Carbon.jpg",
    "https://media.pricebook.co.id/article/594a2ce5150ba02435ebf0e0/594a2ce5150ba02435ebf0e0_1531283039.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy2dbTG9AEyTNIA93Z2VC-BgtiFxHp1wHMlQ&usqp=CAU",
    "https://asset.msi.com/id/picture/news/2018/nb/gaming-notebook-20180118-1.png",
    "https://m.media-amazon.com/images/I/51TdYTykOcL.jpg",
    "https://radarselatan.disway.id/upload/597c2a8498fed0695c3889f0173d67bc.jpg",
    "https://img.mensxp.com/media/content/2019/Sep/this-msi-laptop-is-like-a-portable-desktop1200-1568026939.jpg",
  ];
  const fakeBrands = ["Sumsang", "Xiomay", "Maq", "Azus"];

  let data = [];
  for (let i = 0; i < length; i++) {
    const id = faker.database.mongodbObjectId();
    const price = betweenNumber(1500000, 20000000, 3);
    const name = [
      oneOf(fakeBrands),
      betweenNumber(100, 300) + oneOf(["X", "S", "T"]),
      oneOf([null, "Home", "Gaming Edition", "Slim"]),
    ]
      .filter((x) => !!x)
      .join(" ");
    const image = oneOf(fakeImages);
    const ram = oneOf([2, 4, 8, 16, 32]);
    const storage = oneOf([128, 256, 512, 1024]);
    const cpu_core = oneOf([2, 4, 6, 8, 12]);
    const cpu_base_speed = betweenNumber(200, 700) / 100;
    const gpu_memory = oneOf([2, 4, 8, 16, 24, 32]);
    const gpu_clock_speed = betweenNumber(700, 2500);
    const description = faker.lorem.lines({ min: 3, max: 6 });
    data.push({
      id,
      name,
      image,
      price,
      ram,
      storage,
      cpu_core,
      cpu_base_speed,
      gpu_memory,
      gpu_clock_speed,
      description,
    });
  }

  return data;
}
