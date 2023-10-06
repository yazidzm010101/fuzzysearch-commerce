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
  ];
  const fakeBrands = ["Sumsang", "Xiomay", "Maq", "Azus"];

  let data = [];
  for (let i = 0; i < length; i++) {
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
    const gpu_clock_speed = betweenNumber(700, 2500)
    const description = faker.lorem.lines({min: 3, max: 6});
    data.push({
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
