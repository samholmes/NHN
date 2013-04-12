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
	
	
	$('body')
		.on('click', '.list .post .link', function(){
			window.open(this.href);
			return false;
		})
});


function createListItem(post){
	var template = "<div class='post'> \
				<div class='index'></div> \
				<a class='link'> \
					<span class='title'></span> \
					<span class='domain'></span> \
				</a> \
				<a href='#' class='vote' title='vote up'> \
					<i class='icon'></i> \
					<span class='points'> \
						<span class='count'></span> \
					</span> \
				</a> \
				<a class='comments' title='comments'> \
					<span class='count'></span> \
					<i class='icon'></i> \
				</a> \
				<span class='poster'> \
					by  \
					<a>fabpot</a>  \
				</span> \
				<span class='time'></span> \
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
		.attr('href', 'item?id='+post.id)
		.find('.count')
		.text(post.commentCount);
	
	return $item;
}