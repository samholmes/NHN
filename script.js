$(function(){
	var $list = $('.list');
	
	$.get('http://api.ihackernews.com/page', 
		{format:'jsonp'}, 
		function(data){ 
			$.each(data.items, function(index, item){
				var $item = createListItem(item);
				
				$item.find('.index').text(index+1);
				
				$list.append($item);
			})
		}, 
		'jsonp');
	
	
	$('.index').each(function(index){
		$(this).text(index+1);
	});
});


function createListItem(post){
	var template = "<div class='post'> \
				<div class='index'></div> \
				<a href='#' class='vote' title='vote up'> \
					<i class='icon'></i> \
					<span>Vote Up</span> \
				</a> \
				<a class='link'> \
					<span class='title'></span> \
					<span class='domain'></span> \
				</a> \
				<span class='points'> \
					<span class='count'></span> &#8226; \
				</span> \
				<span class='poster'> \
					by  \
					<a>fabpot</a>  \
				</span> \
				<span class='time'></span> \
				<a class='comments'></a> \
			</div>";
	var $item = $(template);
	
	$item.find('.link').attr('href', post.url);
	$item.find('.link .title').text(post.title);
	$item.find('.points .count').text(post.points);
	
	$item.find('.poster a')
		.text(post.postedBy)
		.attr('href', 'user?id='+post.postedBy);
	
	$item.find('.time').text(post.postedAgo);
	
	$item.find('.comments')
		.text(post.commentCount+' comments')
		.attr('href', 'item?id='+post.id);
	
	return $item;
}