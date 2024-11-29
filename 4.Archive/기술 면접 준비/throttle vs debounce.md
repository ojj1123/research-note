- debounce: 특정 시간만큼 callback 이 실행되지 않았다면 callback을 실행해주는 것 ex) 검색할 때 keystroke할 때마다 API 호출하지 않도록 네트워크 최적화 해줄 수 있음
    
    ```js
    function debounce(func, ms) {
    	let timeoutId = null;
    	return function debounced(...arg) {
    		if(timeoutId != null) {
    			clearTimeout(timeoutId)
    		}
    		timeoutId = setTimeout(() => {
    			func(...arg)
    		}, ms);
    	}
    }
    ```
    
- throttle: callback이 자주 실행되지 않아도록 wait값을 걸어주는 것
    ```js
    // 계속 실행될 때
    // 처음 실행된 시간 - 현재 시간 >= ms => 실행
    // 실행 안함
    
    function throttle(func, ms) {
    	let pendingAt = null
    	const debounced = debounce(func, ms);
    	return function throttled(...arg) {
    		if(pendingAt == null) {
    			pendingAt = Date.now();
    		} else {
    			if(Date.now() - pendingAt >= ms) {
    				pendingAt = Date.now();
    				debounced(...arg);
    			}
    		}
    		debounced(...arg);
    	}
    }
    ```