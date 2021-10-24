from django.views.generic.base import TemplateView


class Index(TemplateView):
    template_name = "myapp/index.html"
