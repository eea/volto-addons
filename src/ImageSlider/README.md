NOTE: this is not used anywhere now!

Goals: to allow context editing any folder and to upload some images that would
be used as slides.

There would be a @slider-images endpoint that would get a list of slider images
attachments. This endpoint can be called on any context, but it would lookup
the attachments up in acquisition chain to find the parent that provides these
attachments.

Then we would have a HeaderSlider component that can lookup these attachments
and compose the slider using this endpoint.

TODO: understand how to provide access to manage the slider. A toolbar button?

Are volto actions configurable?
