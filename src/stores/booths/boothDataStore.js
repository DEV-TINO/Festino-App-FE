import { api } from '@/utils/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useGetBoothDataStore = defineStore('boothData', () => {
  const router = useRouter();

  const selectedIndex = ref(0);

  const allBoothList = ref([]);
  const dayBoothList = ref([]);
  const nightBoothList = ref([]);
  const foodBoothList = ref([]);
  const facilityList = ref([]);
  const boothList = ref([]);

  const selectBoothMenu = ref(0);
  const selectedTicketBooth = ref(false);
  const boothMarkerData = ref('');

  const booth = ref([]);
  const boothType = ref('');
  const urlBoothType = ref('');
  const imageList = ref([]);

  const menuList = ref([]);
  const mainMenu = ref([]);
  const subMenu = ref([]);

  const init = () => {
    booth.value = '';
    boothType.value = '';
    urlBoothType.value = '';
    imageList.value = '';
    menuList.value = '';
    mainMenu.value = '';
    subMenu.value = '';
  };

  const getAllTypeBoothListData = async () => {
    try {
      const urls = [
        '/main/booth/all',
        '/main/booth/night/all',
        '/main/booth/day/all',
        '/main/booth/food/all',
        '/main/facility/all',
      ];

      const results = [];
      for (const url of urls) {
        const res = await api.get(url);
        results.push(res);
      }

      allBoothList.value = results[0].data.boothList;
      nightBoothList.value = results[1].data.boothList;
      dayBoothList.value = results[2].data.boothList;
      foodBoothList.value = results[3].data.boothList;
      facilityList.value = results[4].data.facilityList;

      boothList.value = [];
      boothList.value.push(
        allBoothList.value,
        nightBoothList.value,
        dayBoothList.value,
        foodBoothList.value,
        facilityList.value,
      );
    } catch (error) {
      console.error('Error getAllTypeBoothListData', error);
    }
  };

  const convertBoothMenuTab = (index) => {
    selectedTicketBooth.value = false;

    if (index === 5) {
      selectBoothMenu.value = 4;
      selectedTicketBooth.value = true;
    } else {
      selectBoothMenu.value = index;
    }
  };

  const setBoothTypeUseUrl = (type) => {
    urlBoothType.value = type;
  };

  const getBoothData = async (type, id) => {
    init(); // 부스 데이터 초기화

    try {
      if (type === '야간부스') {
        setBoothType('운동장');
        setBoothTypeUseUrl('night');
      } else if (type === '주간부스') {
        setBoothType('벙커');
        setBoothTypeUseUrl('day');
      } else if (type === '푸드트럭') {
        setBoothType('푸드트럭');
        setBoothTypeUseUrl('food');
      } else if (type === '편의시설') {
        setBoothType('편의시설');
        setBoothTypeUseUrl('facility');
      }

      if (urlBoothType.value !== 'facility') {
        const res = await api.get(`/main/booth/${urlBoothType.value}/${id}`);
        booth.value = res.data.boothInfo;
        imageList.value = res.data.boothInfo.boothImage;

        menuList.value = [];
        if (urlBoothType.value !== 'food') {
          menuList.value = res.data.boothInfo.menuList;
          setMenuType();
        }
        if (urlBoothType.value === 'food') {
          await getFoodTruckMenu(id);
          setMenuType();
        }
      } else {
        const res = await api.get(`/main/${urlBoothType.value}/${id}`);
        booth.value = res.data.facility;
        // 이미지 여부에 따라 결정
        // imageList.value = res.data.boothInfo.boothImage;
      }

      if (urlBoothType.value != 'facility') {
        router.push({ path: `/booth/detail/${urlBoothType.value}/${id}` });
      } else {
        router.push({ path: `/booth/detail/${urlBoothType.value}/${id}` });
      }
    } catch (error) {
      console.error(`Error fetching ${type} booth data:`, error);
    }
  };

  const setBoothType = (type) => {
    boothType.value = type;
  };

  const setMenuType = () => {
    mainMenu.value = [];
    subMenu.value = [];

    if (!menuList.value) return;
    menuList.value.forEach((menu) => {
      if (menu.menuType === 0) {
        mainMenu.value.push(menu.menuName);
      } else {
        subMenu.value.push(menu.menuName);
      }
    });
  };

  const getFoodTruckMenu = async (id) => {
    try {
      const response = await api.get(`/main/menu/all/booth/${id}`);
      menuList.value = response.data.menuList;
    } catch (error) {
      console.error('Error fetching food truck menu:', error);
    }
  };
  return {
    allBoothList,
    dayBoothList,
    nightBoothList,
    foodBoothList,
    boothList,
    selectBoothMenu,
    selectedTicketBooth,
    boothMarkerData,
    booth,
    boothType,
    urlBoothType,
    imageList,
    menuList,
    mainMenu,
    subMenu,
    init,
    getAllTypeBoothListData,
    convertBoothMenuTab,
    getBoothData,
    setBoothType,
    setMenuType,
    selectedIndex,
  };
});
