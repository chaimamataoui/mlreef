@data_processor(
    name="Resnet 2.0 Filter",
    author="MLReef",
    type="ALGORITHM",
    description="Transforms images with lots of magic",
    visibility="PUBLIC",
    input_type="IMAGE",
    output_type="IMAGE"
)
@parameter(name="cropFactor", type="Float")
@parameter(name="imageFiles", type="List")
@parameter(name="optionalFilterParam", type="Integer", required=False, defaultValue=1)
def myCustomOperationEntrypoint(cropfactor, imageFiles, optionalFilterParam=1):
    print("stuff happening here")
    # output is not exported via return, but rather as Files.
    # we have to provide a way to store and chain outputs to the next input


myCustomOperationEntrypoint(epfInputArray)


@data_processor(
    name="Resnet 2.0 Filter",
    author="MLReef",
    description="Transforms images with lots of magic",
    visibility="PUBLIC",
    input_type="IMAGE",
    output_type="IMAGE"
)
@parameter(name="cropFactor", type="Float")
@parameter(name="imageFiles", type="List")
@parameter(name="optionalFilterParam", type="Integer", nullable=true, defaultValue=1)
def myCustomOperationEntrypoint2(cropfactor, imageFiles, optionalFilterParam=1):
    print("stuff happening here")
    # output is not exported via return, but rather as Files.
    # we have to provide a way to store and chain outputs to the next input


myCustomOperationEntrypoint2(epfInputArray)
