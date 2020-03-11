$(document).ready(() => {
	getComments()
	// helper function to get comments from database
	function getComments() {
		$.ajax({ 
			url: '/comments', type: 'GET', dataType: 'json',
			success: (data) => {
				comments = ''
				for (const c of data){
					comments = 
						`<br><div id=comment>`+
							`<div id=name>`+
								c.name + ' — ' + c.datetime + 
							`</div>` + 
							`<div id=message>`+
								c.comment + 
							`</div>` + 
						`<br><hr></div>` +
						comments
				}
				$('#comments').html(comments)
				$('#commentCount').html(data.length + (data.length==1 ? ' comment' : ' comments'))
		}})	
	}

	// on comment submit
	$('#submitButton').click(()=>{
		if ($('#nameBox').val() && $('#commentBox').val()){
			var d = new Date();
			var o = {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'};
			d = d.toLocaleDateString('en-US', o);
			$.ajax({ url: '/comments', type: 'POST', 
			data: {
				name: $('#nameBox').val(),
				comment: $('#commentBox').val(),
				datetime: d
			},
			success: (data) => {
				getComments()
				$('#nameBox').val('')
				$('#commentBox').val('')
			}
			})	
		}
	})
})