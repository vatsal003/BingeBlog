

// var blogs = [1,2,3,4,5,6];
// var time = [6,10,1,2,10,6];
// var n = blogs.length;
// userTime = 15;

// var output = new Array(n+2);


// output = algo(blogs,time,userTime);


function algo(blogs,time,userTime){
	
	var n = blogs;
	var w = userTime;
    var m = w+2;
	console.log("in algo",n,w,time)
    let dp = new Array(n+2).fill(0).map(() => new Array(m).fill(0));

    let visit = new Array(n+2).fill(0).map(() => new Array(m).fill(0));
	let maxi = 0;

	for(let i=1;i<=n;i++){
		
		for(let j=0;j<=w;j++){
			
			dp[i][j] = Math.max(dp[i][j],dp[i-1][j]);
			if(time[i-1] <= j){
				
				if(dp[i][j] < (1 + dp[i - 1][j - time[i-1]])){
					
					dp[i][j] = 1 + dp[i - 1][j - time[i-1]];
					visit[i][j] = dp[i][j];
				}
				else if(dp[i][j] < dp[i-1][j]){
					dp[i][j] = dp[i-1][j];
				}
			}
			maxi = Math.max(maxi,dp[i][j]);
		}
	}
	
	var sendBlogs = new Array(n+2);
	let counter = maxi;
	console.log(counter);

	for(let i=n;i>=0;i--){
		
		for(let j=w;j>=0;j--){
			
			if(visit[i][j] == counter && counter > 0){
                counter--;
				sendBlogs.push(i);
                break;	
			}
		}
	}
    console.log(sendBlogs);
	
	return sendBlogs;
}

module.exports = {algo}
