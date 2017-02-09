# name: nova-detail
# about: A widget to show details about nova
# version: 0.1
# authors: SMHassanAlavi
register_asset 'stylesheets/user-widget.scss'

after_initialize do
  SiteSetting.class_eval do
    @choices[:layouts_sidebar_right_widgets].push('nova')
  end
end
