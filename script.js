document.addEventListener('DOMContentLoaded', function () {
	dij__startApp();
});
function dij__startApp()
{
	dij__addDocumentListeners();
}
function dij__toggleWindow(elemId, event)
{
	let windowElem = document.getElementById(elemId);
	if (windowElem)
	{
		if (windowElem.classList.contains('hidden'))
		{
			windowElem.classList.remove('hidden');
			event.target.parentNode.appendChild(windowElem.parentNode.removeChild(windowElem));
			let finalLeft = event.target.offsetLeft;
			if (finalLeft + windowElem.offsetWidth > event.target.offsetParent.offsetWidth)
				finalLeft = finalLeft - windowElem.offsetWidth + event.target.scrollWidth;
			if (finalLeft < 0)
				finalLeft = event.target.offsetParent.offsetWidth/2 - windowElem.offsetWidth/2;
			windowElem.style.left = `${finalLeft}px`;
			windowElem.style.top = `${event.target.offsetTop + event.target.offsetHeight}px`;
		}
		else
		{
			windowElem.classList.add('hidden');
		}
	}
}
function dij__getParentByClass(node, classString)
{
	while (node)
	{
		if (node.classList && node.classList.contains(classString))
		{
			break;
		}
		node = node.parentNode;
	}
	return node;
}

function dij__addDocumentListeners()
{
	document.addEventListener(
		'click',
		function(event)
		{
			if (event.target.classList.contains('close-box'))
			{
				event.target.parentNode.classList.add('hidden');
			}
			else if (event.target.classList.contains('detail'))
			{
				dij__toggleWindow(`${event.target.id}-elem`, event);
			}
			else if (event.target.classList.contains('theme-selector'))
			{
				document.body.parentNode.setAttribute('data-theme', event.target.getAttribute('theme-name'));
			}
			else if (event.target.classList.contains('swap-language'))
			{
				let translation = dij__getParentByClass(event.target, 'translation');
				if (translation)
				{
					translation.classList.toggle('japanese');
					if (translation.classList.toggle('english'))
					{
						event.target.innerText = 'Show Japanese';
					}
					else
					{
						event.target.innerText = 'Show English';
					}
				}
			}
		}
	);
}