$(document).ready(() => {

	// helper function to get comments from database
	getComments()

	// new get comments [TODO]
	function getComments() {
		$.ajax({
			url: '/comments', type: 'GET',
			success: (data) => {
				comments = ''
				console.log(data)
				$.each(data, (i, c) => {
					comments =
						`<br><div id=comment>` +
						`<div id=name>` +
						c.name + ' — ' + c.datetime +
						`</div>` +
						`<div id=message>` +
						c.comment +
						`</div>` +
						`<br><hr></div>` +
						comments
				})
				$('#comments').html(comments)
				$('#commentCount').html(Object.keys(data).length + (Object.keys(data).length == 1 ? ' comment' : ' comments'))
			},
			error: (e) => alert(e)
		})
	}

	$('#submitButton').on("click", () => {
		submitComment();
	})

	// new comment submit
	function submitComment() {
		if ($('#nameBox').val() && $('#commentBox').val()) {
			// get data from form
			var d = new Date();
			var o = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
			d = d.toLocaleDateString('en-US', o);

			// create data object
			var formData = {
				name: $('#nameBox').val(),
				comment: $('#commentBox').val(),
				datetime: d
			}

			// submit form
			$.ajax({
				url: '/comments', type: 'POST', data: formData, dataType: 'json',
				success: (data) => {
					getComments()
					$('#nameBox').val('')
					$('#commentBox').val('')
				},
				error: (e) => alert(e)
			})
		}
	}

	// change to light theme
	$('#light').on("click", () => {
		$('#theme')[0].href = 'css/light.css'
		$('#light').css('color', 'black')
		$('#dark').css('color', 'rgba(100, 100, 100, 0.5)')
	})

	// change to dark theme
	$('#dark').on("click", () => {
		$('#theme')[0].href = 'css/dark.css'
		$('#light').css('color', 'rgba(255, 255, 255, 0.3)')
		$('#dark').css('color', 'white')
	})
})
