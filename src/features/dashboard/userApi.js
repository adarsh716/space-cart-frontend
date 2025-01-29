export function fetchUserCount() {
    return new Promise(async (resolve) => {
      const response = await fetch('/users/countuser');
      const data = await response.json();
      resolve({ data });
    });
  }

  export function fetchOrderCount() {
    return new Promise(async (resolve) => {
      const response = await fetch('/orders/ordercount');
      const data = await response.json();
      resolve({ data });
    });
  }

  
  export function fetchProductCount() {
    return new Promise(async (resolve) => {
      const response = await fetch('/products/countproduct');
      const data = await response.json();
      resolve({ data });
    });
  }

  export function fetchAllProductst() {
    return new Promise(async (resolve) => {
      const response = await fetch('/products/dash');
      const data = await response.json();
      resolve({ data });
    });
  }
  
  